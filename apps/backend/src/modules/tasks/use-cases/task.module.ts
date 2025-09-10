import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskController } from "../controller/task.controller";
import { TaskInMemoryRepository } from "../repository/task-in-memory-repository";

@Module({
    imports: [],
    controllers: [TaskController],
    providers: [TaskService, TaskInMemoryRepository],
    exports: [TaskService],
})
export class TaskModule { }