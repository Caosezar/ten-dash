import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Task, TaskStatus } from "../../types"
import { TaskStatusCell } from "./task-table-status-cell"

export const taskColumns = (): ColumnDef<Task>[] => [
  {
    accessorKey: "title" as keyof Task,
    header: ({ column }) => (
      <Button className="cursor-pointer" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Título
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium max-w-52 overflow-hidden">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description" as keyof Task,
    header: "Descrição",
    cell: ({ row }) => {
      const desc = row.getValue("description") as string | undefined
      const displayText = desc ? desc : "Sem descrição"
      
      if (desc && desc.length > 50) {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="max-w-52 overflow-hidden text-ellipsis cursor-pointer">
                  {displayText.substring(0, 50)}...
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm cursor-default max-h-96 overflow-auto">
                <p className="whitespace-pre-wrap">{displayText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      }
      
      return <div className="max-w-52 text-ellipsis">{displayText}</div>
    },
  },
  {
    accessorKey: "status" as keyof Task,
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as TaskStatus
      return <TaskStatusCell status={status ? status : TaskStatus.PENDING} />
    },
  },
  {
    accessorKey: "createdAt" as keyof Task,
    header: ({ column }) => (
      <Button className="cursor-pointer" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Criado em
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const dateStr = row.getValue("createdAt") as string
      return dateStr ? <div>{new Date(dateStr).toLocaleDateString('pt-BR')}</div> : "—"
    },
  },
  {
    accessorKey: "updatedAt" as keyof Task,
    header: ({ column }) => (
      <Button className="cursor-pointer" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Atualizado em
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const updateDate = row.getValue("updatedAt") as string
      const formattedDate = updateDate ? new Date(updateDate).toLocaleDateString('pt-BR') : "—"
      
      return (
        <div className="flex items-center w-full">
          {formattedDate}
        </div>
      )
    },
  },
]
