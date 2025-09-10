import { Body, Controller, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from '../use-cases/task.service';
import { TaskDTO } from '../domain/dtos/task-dto';

@Controller('/tasks')
export class TaskController {
    constructor(
        private taskService: TaskService,
    ) { }

    @Get()
    async getTasks() {
        return await this.taskService.findAllTasks();
    }

    @Post()
    @HttpCode(201)
    async createTask(@Body() task: TaskDTO) {
        return {
            message: await this.taskService.createTask(task)
        };
    }

    @Patch(':id/done')
    @HttpCode(200)
    async toggleTaskDone(@Param('id') id: string) {
        return await this.taskService.toggleTaskDone(id);
    }
}
