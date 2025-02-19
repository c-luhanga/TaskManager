import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { User } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getTasks(userId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: { 
        user: { id: userId } 
      },
      relations: ['user'],
      order: {
        id: 'DESC' 
      }
    });
  }

  async createTask(userId: number, createTaskDto: CreateTaskDto): Promise<Task> {
    // First, find the user
    const user = await this.userRepository.findOne({ 
      where: { id: userId }
    });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // Create and save the task with the user relation
    const task = this.taskRepository.create({
      ...createTaskDto,
      user: user,
      userId: user.id // Explicitly set the userId
    });
  
    return await this.taskRepository.save(task);
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto, userId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user'],
    });
  
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    
    // Check if the DTO has any update values
    if (Object.keys(updateTaskDto).length === 0) {
      return task; // Nothing to update, return existing task.
    }
  
    // Merge update values into task and save
    Object.assign(task, updateTaskDto);
    return await this.taskRepository.save(task);
  }


  async deleteTask(id: number, userId: number): Promise<void> {
    // First find the task to ensure it exists and belongs to the user
  const task = await this.taskRepository.findOne({
    where: { 
      id: id,
      user: { id: userId }
    }
  });

  if (!task) {
    throw new NotFoundException('Task not found');
  }

  await this.taskRepository.remove(task);
  }
}