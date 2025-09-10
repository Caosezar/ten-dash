"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Task, TaskStatus } from "../types/task"

interface CreateTaskDialogProps {
}

export function CreateTaskDialog({}: CreateTaskDialogProps = {}) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    
    const queryClient = useQueryClient()

    const createTaskMutation = useMutation({
        mutationFn: async (newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
            const response = await fetch('http://localhost:4000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: newTask.title,
                    description: newTask.description,
                }),
            })
            
            if (!response.ok) {
                throw new Error('Erro ao criar tarefa')
            }
            
            return response.json()
        },
        onSuccess: () => {
            
            queryClient.invalidateQueries({ queryKey: ['tasks'] })

            setTitle("")
            setDescription("")
            setIsOpen(false)
        },
        onError: (error) => {
            console.error('Error creating task:', error)
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!title.trim()) {
            return
        }

        const newTask = {
            title: title.trim(),
            description: description.trim() || undefined,
            status: TaskStatus.PENDING
        }
        
        createTaskMutation.mutate(newTask)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Adicionar Task</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Nova Task</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Título *</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Digite o título da tarefa"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Descrição</Label>
                            <Input
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Digite uma descrição (opcional)"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button 
                            type="submit" 
                            disabled={!title.trim() || createTaskMutation.isPending}
                        >
                            {createTaskMutation.isPending ? "Criando..." : "Criar Task"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
