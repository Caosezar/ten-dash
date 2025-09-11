
import { useQuery } from "@tanstack/react-query"
import { Task } from "../types"
import { QUERY_CONFIG } from "@/app/config"

export const useGetTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async (): Promise<Task[]> => {
      const response = await fetch('http://localhost:4000/tasks')

      if (!response.ok) {
        throw new Error('Erro ao carregar tarefas')
      }

      return response.json()
    },
    ...QUERY_CONFIG,
  })
}
