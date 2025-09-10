import { Injectable } from "@nestjs/common";
import { Task } from "../domain/entities/task";
import { TaskStatus } from "../domain/enum";
import { InMemoryBaseRepository } from "./base-in-memory-repository";

@Injectable()
export class TaskInMemoryRepository extends InMemoryBaseRepository<Task> {

    async toggleTaskDone(id: string): Promise<Task | null> {
        const task = await this.findById(id);
        if (!task) return null;

        const newStatus = task.status === TaskStatus.COMPLETED 
            ? TaskStatus.PENDING 
            : TaskStatus.COMPLETED;

        return this.update(id, { 
            status: newStatus, 
            updatedAt: new Date() 
        } as Partial<Task>);
    }
}