import { ColumnFiltersState, SortingState, VisibilityState } from "@tanstack/react-table"
import { Task, TaskStatus } from "./task"

export interface TaskTableState {
  sorting: SortingState
  columnFilters: ColumnFiltersState
  columnVisibility: VisibilityState
  rowSelection: Record<string, boolean>
}

export interface TaskActionsProps {
  task: Task
  onStatusChange: (taskId: string) => void
  isChanging: boolean
}

export interface TaskStatusCellProps {
  status: TaskStatus
}

export interface TableLoadingStateProps {
  colSpan: number
}

export interface TableErrorStateProps {
  colSpan: number
  onRetry: () => void
  isRetrying: boolean
}

export interface TableEmptyStateProps {
  colSpan: number
}

export interface QueryConfig {
  readonly staleTime: number
  readonly refetchOnWindowFocus: boolean
  readonly refetchOnMount: boolean
  readonly refetchInterval: false
  readonly retry: number
}

export type StatusColorsMap = Record<TaskStatus, string>

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreateTaskDialogProps {
  // add props no futuro
}

export interface CreateTaskFormData {
  title: string
  description: string
}

export type CreateTaskRequest = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>

export interface CreateTaskDialogState {
  title: string
  description: string
  isOpen: boolean
}
