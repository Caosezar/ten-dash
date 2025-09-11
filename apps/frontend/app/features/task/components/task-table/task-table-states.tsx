import React from "react"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { TableLoadingStateProps, TableErrorStateProps, TableEmptyStateProps } from "../../types"

export const TableLoadingState: React.FC<TableLoadingStateProps> = ({ colSpan }) => (
  <TableRow>
    <TableCell colSpan={colSpan} className="h-24 text-center">
      <div className="flex items-center justify-center">
        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
        Carregando tarefas...
      </div>
    </TableCell>
  </TableRow>
)

export const TableErrorState: React.FC<TableErrorStateProps> = ({ colSpan, onRetry, isRetrying }) => (
  <TableRow>
    <TableCell colSpan={colSpan} className="h-24 text-center">
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="text-red-500">Erro ao carregar tarefas</div>
        <Button variant="outline" size="sm" onClick={onRetry} disabled={isRetrying}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isRetrying && 'animate-spin'}`} />
          Tentar novamente
        </Button>
      </div>
    </TableCell>
  </TableRow>
)

// componente simples para quando não tem dados
export const TableEmptyState: React.FC<TableEmptyStateProps> = ({ colSpan }) => (
  <TableRow>
    <TableCell colSpan={colSpan} className="h-24 text-center">
      Nenhuma tarefa encontrada.
    </TableCell>
  </TableRow>
)
