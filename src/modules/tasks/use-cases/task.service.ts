import { Injectable } from "@nestjs/common";
import { Task } from "../domain/entities/task";
import { TaskInMemoryRepository } from "../repository/task-in-memory-repository";
import { TaskDTO } from "../domain/dtos/task-dto";


@Injectable()
export class TaskService {

    constructor(private readonly taskRepository: TaskInMemoryRepository) { }

    async createTask(task: TaskDTO): Promise<Task> {
        const newTask = new Task();
        Object.assign(newTask, { ...task, createdAt: new Date(), updatedAt: new Date(), id: crypto.randomUUID() });
        return this.taskRepository.create(newTask);
    }
}