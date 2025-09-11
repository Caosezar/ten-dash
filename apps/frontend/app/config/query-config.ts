import { QueryConfig } from "../features/task/types"

export const QUERY_CONFIG: QueryConfig = {
  staleTime: 5 * 60 * 1000,
  refetchOnWindowFocus: false,
  refetchOnMount: true,
  refetchInterval: false,
  retry: 3,
}
