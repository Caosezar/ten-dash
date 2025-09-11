import React from "react"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TaskActionsProps, TaskStatus } from "../../types"

export const TaskActions: React.FC<TaskActionsProps> = ({ task, onStatusChange, isChanging }) => {
  const getStatusText = (status: TaskStatus | undefined): string => {
    const currentStatus = status || TaskStatus.PENDING
    return currentStatus === TaskStatus.COMPLETED ? 'Marcar como pendente' : 'Marcar como concluída'
  }

  // TODO: melhorar este menu depois
  const handleStatusChange = () => {
    // console.log('toggling task:', task.id)
    onStatusChange(task.id)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col items-center">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleStatusChange}
          disabled={isChanging}
        >
          {getStatusText(task.status)}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
