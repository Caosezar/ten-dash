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
    accessorKey: "title",
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
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => {
      const desc = row.getValue("description") as string
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as TaskStatus
      return <TaskStatusCell status={status || TaskStatus.PENDING} />
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button className="cursor-pointer" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Criado em
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const dateStr = row.getValue("createdAt") as string
      if (!dateStr) return "—"
      
      const date = new Date(dateStr)
      return <div>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</div>
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <Button className="cursor-pointer" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Atualizado em
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const updateDate = row.getValue("updatedAt") as string
      if (!updateDate) return "—"
      
      const date = new Date(updateDate)
      return <div>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</div>
    },
  },
]
