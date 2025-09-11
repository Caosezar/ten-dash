import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Task, CreateTaskRequest } from "../types"

export function useCreateTask() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (taskData: any) => {
            const response = await fetch('http://localhost:4000/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData),
            })
            
            if (!response.ok) {
                throw new Error('Erro ao criar tarefa')
            }
            
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            resetForm()
            setIsOpen(false)
        },
    })


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!title.trim()) return

        const cleanTitle = title.trim()
        const cleanDesc = description.trim() || undefined
        
        mutation.mutate({ 
            title: cleanTitle, 
            description: cleanDesc 
        })
    }

    const resetForm = () => {
        setTitle("")
        setDescription("")
    }

    return {
        title,
        description,
        isOpen,
        isLoading: mutation.isPending,
        setTitle,
        setDescription,
        setIsOpen,
        handleSubmit,
        resetForm
    }
}
