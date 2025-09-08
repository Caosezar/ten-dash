import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { TaskService } from '../use-cases/task.service';
import { TaskDTO } from '../domain/dtos/task-dto';

@Controller('/tasks')
export class TaskController {
    constructor(
        private taskService: TaskService,
    ) { }
    @Post()
    @HttpCode(201)
    async createTask(@Body() task: TaskDTO) {
        return {
            message: await this.taskService.createTask(task)
        };
    }
}
