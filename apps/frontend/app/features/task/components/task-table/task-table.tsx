"use client"

import React from "react"
import { ChevronDown, RefreshCw } from "lucide-react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Task, TaskTableState } from "../../types"
import { TaskActions } from "./task-table-actions"
import { taskColumns } from "./task-table-columns"
import { TableLoadingState, TableErrorState, TableEmptyState } from "./task-table-states"
import { useChangeTaskStatus } from "../../services/use-change-task-status"
import { useGetTasks } from "../../services/use-get-tasks"

export function TaskTable() {
  //remover 
  const [state, setState] = React.useState<TaskTableState>({
    sorting: [],
    columnFilters: [],
    columnVisibility: {},
    rowSelection: {},
  })

  const changeMutation = useChangeTaskStatus()

  const { data: tasks = [], isLoading, error, refetch } = useGetTasks()

  const columns = React.useMemo((): ColumnDef<Task>[] => {
    const baseColumns = taskColumns()
    
    return [
      ...baseColumns,
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => (
          <TaskActions 
            task={row.original}
            onStatusChange={(taskId) => changeMutation.mutate(taskId)}
            isChanging={changeMutation.isPending}
          />
        ),
      },
    ]
  }, [changeMutation])

  const table = useReactTable({
    data: tasks,
    columns,
    onSortingChange: (updater) => setState(prev => ({ 
      ...prev, 
      sorting: typeof updater === 'function' ? updater(prev.sorting) : updater 
    })),
    onColumnFiltersChange: (updater) => setState(prev => ({ 
      ...prev, 
      columnFilters: typeof updater === 'function' ? updater(prev.columnFilters) : updater 
    })),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: (updater) => setState(prev => ({ 
      ...prev, 
      columnVisibility: typeof updater === 'function' ? updater(prev.columnVisibility) : updater 
    })),
    onRowSelectionChange: (updater) => setState(prev => ({ 
      ...prev, 
      rowSelection: typeof updater === 'function' ? updater(prev.rowSelection) : updater 
    })),
    state: state,
  })

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
            {isLoading ? (
              <TableLoadingState colSpan={columns.length} />
            ) : error ? (
              <TableErrorState 
                colSpan={columns.length}
                onRetry={refetch}
                isRetrying={isLoading}
              />
            ) : table.getRowModel().rows?.length ? (
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
              <TableEmptyState colSpan={columns.length} />
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
