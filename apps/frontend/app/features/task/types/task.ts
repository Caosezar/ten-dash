export interface Task {
  id: string;
  title: string;
  description?: string;
  status?: TaskStatus;
  createdAt?: string;
  updatedAt?: string;
}

export enum TaskStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
}
