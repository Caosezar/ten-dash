import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"

interface TaskFormProps {
    title: string
    description: string
    isLoading: boolean
    onTitleChange: (value: string) => void
    onDescriptionChange: (value: string) => void
    onSubmit: (e: React.FormEvent) => void
}

export function TaskForm({
    title,
    description,
    isLoading,
    onTitleChange,
    onDescriptionChange,
    onSubmit
}: TaskFormProps) {
    return (
        <form onSubmit={onSubmit}>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="title">Título *</Label>
                    <Input
                        maxLength={40}
                        id="title"
                        value={title}
                        onChange={(e) => onTitleChange(e.target.value)}
                        placeholder="Digite o título da tarefa"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="description">Descrição *</Label>
                    <Textarea
                        maxLength={300}
                        id="description"
                        value={description}
                        onChange={(e) => onDescriptionChange(e.target.value)}
                        placeholder="Digite uma descrição"
                        rows={3}
                        required
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                if (title.trim() && description.trim()) {
                                    const form = e.currentTarget.form
                                    if (form) {
                                        const event = new Event('submit', { bubbles: true, cancelable: true })
                                        form.dispatchEvent(event)
                                    }
                                }
                            }
                        }}
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
                    disabled={!title.trim() || !description.trim() || isLoading}
                >
                    {isLoading ? "Criando..." : "Criar Task"}
                </Button>
            </DialogFooter>
        </form>
    )
}
