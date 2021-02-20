import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatusEnum } from './task.model';
import { v1 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks(): Task[]{
        return this.tasks.slice();
    }

    getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
        const {status, searchTerm} = filterDto;
        let tasks = this.getAllTasks();
        if(status) {
            tasks = tasks.filter(task => task.status === status)
        }
        if(searchTerm) {
            tasks = tasks.filter(task => 
                task.title.includes(searchTerm) 
                || task.description.includes(searchTerm)
                )
        }
        return tasks;
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find(task => task.id === id);
        if(!found) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return found;
    }

    createTask(createTaskDto: CreateTaskDto){
        const {title, description} = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatusEnum.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    updateTaskStatus(id: string, status: TaskStatusEnum): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    deleteTask(id: string): void {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}
