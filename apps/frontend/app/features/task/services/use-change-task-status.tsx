import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useChangeTaskStatus = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (taskId: string) => {
      const response = await fetch(`http://localhost:4000/tasks/${taskId}/done`, {
        method: 'PATCH',
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar status da tarefa')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
