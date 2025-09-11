"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { CreateTaskDialogProps } from "../../types"
import { useCreateTask } from "../../services/use-create-task"
import { TaskForm } from "./task-form"

export function CreateTaskDialog({}: CreateTaskDialogProps = {}) {
    const {
        title,
        description,
        isOpen,
        isLoading,
        setTitle,
        setDescription,
        setIsOpen,
        handleSubmit
    } = useCreateTask()

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="default">+ Adicionar Task</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[55vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle>Nova Task</DialogTitle>
                </DialogHeader>
                <TaskForm
                    title={title}
                    description={description}
                    isLoading={isLoading}
                    onTitleChange={setTitle}
                    onDescriptionChange={setDescription}
                    onSubmit={handleSubmit}
                />
            </DialogContent>
        </Dialog>
    )
}
