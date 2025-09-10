"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, RefreshCw } from "lucide-react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Task, TaskStatus } from "../types/task"

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Título
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => {
      const description = row.getValue("description") as string
      return <div className="text-muted-foreground">{description || "—"}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as TaskStatus
      const statusColors = {
        [TaskStatus.PENDING]: "bg-yellow-100 text-yellow-800 border-yellow-200",
        [TaskStatus.CREATED]: "bg-blue-100 text-blue-800 border-blue-200",
        [TaskStatus.IN_PROGRESS]: "bg-purple-100 text-purple-800 border-purple-200",
        [TaskStatus.BLOCKED]: "bg-red-100 text-red-800 border-red-200",
        [TaskStatus.COMPLETED]: "bg-green-100 text-green-800 border-green-200",
      }
      
      const displayStatus = status || TaskStatus.PENDING
      
      return (
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusColors[displayStatus]}`}>
          {displayStatus}
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Criado em
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string
      return <div>{date ? new Date(date).toLocaleDateString('pt-BR') : "—"}</div>
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Atualizado em
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as string
      return <div>{date ? new Date(date).toLocaleDateString('pt-BR') : "—"}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const task = row.original
      const queryClient = useQueryClient()

      const toggleStatusMutation = useMutation({
        mutationFn: async (taskId: string) => {
          const response = await fetch(`http://localhost:4000/tasks/${taskId}/done`, {
            method: 'PATCH',
          })
          
          if (!response.ok) {
            throw new Error('Erro ao atualizar status da tarefa')
          }
          
          return response.json()
        },
        onSuccess: (updatedTask) => {
          // Atualiza apenas a task específica no cache em vez de invalidar tudo
          queryClient.setQueryData(['tasks'], (oldTasks: Task[] = []) => {
            return oldTasks.map(task => 
              task.id === updatedTask.id ? updatedTask : task
            )
          })
        },
        onError: (error) => {
          console.error('Erro ao atualizar status da tarefa:', error)
          // Em caso de erro, invalida para recarregar os dados corretos
          queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
      })

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(task.id)}
            >
              Copiar ID da tarefa
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => toggleStatusMutation.mutate(task.id)}
              disabled={toggleStatusMutation.isPending}
            >
              {task.status === TaskStatus.COMPLETED 
                ? 'Marcar como pendente' 
                : 'Marcar como concluída'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function TaskTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // React Query para buscar as tasks
  const { data: tasks = [], isLoading, error, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: async (): Promise<Task[]> => {
      const response = await fetch('http://localhost:4000/tasks')
      
      if (!response.ok) {
        throw new Error('Erro ao carregar tarefas')
      }
      
      return response.json()
    },
    // Configurações para controlar quando a query é executada
    staleTime: 5 * 60 * 1000, // 5 minutos - dados são considerados "frescos" por 5 min
    refetchOnWindowFocus: false, // Não refaz a query ao focar na janela
    refetchOnMount: true, // Refaz a query ao montar o componente
    refetchInterval: false, // Não refaz a query automaticamente em intervalos
    retry: 3, // Tenta até 3 vezes em caso de erro
  })

  const table = useReactTable({
    data: tasks,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div>Carregando tarefas...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-32 space-y-2">
        <div className="text-red-500">Erro ao carregar tarefas</div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => refetch()}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Tentar novamente
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Filtrar por título..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isLoading}
          className="ml-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhuma tarefa encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}
