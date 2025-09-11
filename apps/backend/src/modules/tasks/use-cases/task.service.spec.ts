import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskInMemoryRepository } from '../repository/task-in-memory-repository';
import { TaskDTO } from '../domain/dtos/task-dto';
import { TaskStatus } from '../domain/enum';

describe('TaskService', () => {
  let service: TaskService;
  let repository: TaskInMemoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        TaskInMemoryRepository,
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    repository = module.get<TaskInMemoryRepository>(TaskInMemoryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task with correct properties', async () => {
      // arrange
      const taskDto: TaskDTO = {
        title: 'Test Task',
        description: 'This is a test task',
      };

      // act
      const result = await service.createTask(taskDto);

      // assert
      expect(result).toBeDefined();
      expect(result.title).toBe('Test Task');
      expect(result.description).toBe('This is a test task');
      expect(result.status).toBe(TaskStatus.PENDING);
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();
    });

    it('should create task with only title when description is empty', async () => {
      const taskDto: TaskDTO = {
        title: 'Simple task',
        description: '',
      };

      const result = await service.createTask(taskDto);

      expect(result.title).toBe('Simple task');
      expect(result.description).toBe('');
      expect(result.status).toBe(TaskStatus.PENDING);
    });
  });

  describe('findAllTasks', () => {
    it('should return empty array when no tasks exist', async () => {
      const result = await service.findAllTasks();
      expect(result).toEqual([]);
    });

    it('should return all created tasks', async () => {
      // criando algumas tasks primeiro
      const task1: TaskDTO = { title: 'Task 1', description: 'First task' };
      const task2: TaskDTO = { title: 'Task 2', description: 'Second task' };
      
      await service.createTask(task1);
      await service.createTask(task2);

      const result = await service.findAllTasks();

      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Task 1');
      expect(result[1].title).toBe('Task 2');
    });
  });

  describe('changeTaskStatus', () => {
    it('should toggle task from PENDING to COMPLETED', async () => {
      // criando uma task
      const taskDto: TaskDTO = {
        title: 'Toggle test',
        description: 'Testing toggle functionality',
      };
      
      const createdTask = await service.createTask(taskDto);
      expect(createdTask.status).toBe(TaskStatus.PENDING);

      // fazendo o change
      const changedTask = await service.changeTaskStatus(createdTask.id);

      expect(changedTask).toBeDefined();
      expect(changedTask!.status).toBe(TaskStatus.COMPLETED);
      expect(changedTask!.id).toBe(createdTask.id);
    });

    it('should change task from COMPLETED back to PENDING', async () => {
      const taskDto: TaskDTO = {
        title: 'Another change test',
        description: 'Testing reverse change',
      };
      
      const createdTask = await service.createTask(taskDto);
      
      // fazendo change duas vezes
      await service.changeTaskStatus(createdTask.id);
      const finalTask = await service.changeTaskStatus(createdTask.id);

      expect(finalTask!.status).toBe(TaskStatus.PENDING);
    });

    it('should return null when trying to toggle non-existent task', async () => {
      const result = await service.changeTaskStatus('fake-id-123');
      expect(result).toBeNull();
    });
  });

  // casos extremos
  describe('edge cases', () => {
    it('should handle very long task titles', async () => {
      const longTitle = 'a'.repeat(500);
      const taskDto: TaskDTO = {
        title: longTitle,
        description: 'Long title test',
      };

      const result = await service.createTask(taskDto);
      expect(result.title).toBe(longTitle);
    });

    it('should create multiple tasks with unique IDs', async () => {
      const tasks: any[] = [];
      
      for (let i = 0; i < 5; i++) {
        const task = await service.createTask({
          title: `Task ${i}`,
          description: `Description ${i}`,
        });
        tasks.push(task);
      }

      // verificando se todos os IDs são únicos
      const ids = tasks.map(t => t.id);
      const uniqueIds = [...new Set(ids)];
      expect(uniqueIds).toHaveLength(5);
    });

    it('should handle undefined description', async () => {
      const taskDto: TaskDTO = {
        title: 'Task without description',
        description: undefined as any,
      };

      const result = await service.createTask(taskDto);
      expect(result.title).toBe('Task without description');
      expect(result.description).toBeUndefined();
    });
  });
});
