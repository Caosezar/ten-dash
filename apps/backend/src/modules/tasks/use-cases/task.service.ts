import { Injectable } from "@nestjs/common";
import { Task } from "../domain/entities/task";
import { TaskInMemoryRepository } from "../repository/task-in-memory-repository";
import { TaskDTO } from "../domain/dtos/task-dto";
import { TaskStatus } from "../domain/enum";


@Injectable()
export class TaskService {

    constructor(private readonly taskRepository: TaskInMemoryRepository) { }

    async findAllTasks() {
        return this.taskRepository.findAll();
    }

    async createTask(task: TaskDTO): Promise<Task> {
        const newTask = new Task();
        Object.assign(newTask, { 
            ...task, 
            status: TaskStatus.PENDING,
            createdAt: new Date(), 
            updatedAt: new Date(), 
            id: crypto.randomUUID() 
        });
        return this.taskRepository.create(newTask);
    }

    async toggleTaskDone(id: string): Promise<Task | null> {
        return this.taskRepository.toggleTaskDone(id);
    }
}