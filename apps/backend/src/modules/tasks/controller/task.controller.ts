import { Body, Controller, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from '../use-cases/task.service';
import { TaskDTO } from '../domain/dtos/task-dto';

@Controller('tasks')
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Get()
    async getTasks() {
        return await this.taskService.findAllTasks();
    }

    @Post()
    createTask(@Body() task: TaskDTO) {
        return this.taskService.createTask(task);
    }

    @Patch(':id/done')
    changeTaskStatus(@Param('id') id: string) {
        return this.taskService.changeTaskStatus(id);
    }
}
