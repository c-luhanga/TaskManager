import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { Task } from './task.entity'; // Adjust the import path as necessary
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getTasks(@Request() req) {
    return this.tasksService.getTasks(req.user.userId);
  }
  
  @Post()
  async createTask(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(req.user.userId, createTaskDto);
  }
  
  @Put(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ): Promise<Task> {
    const taskId = +id;
    return this.tasksService.updateTask(taskId, updateTaskDto, req.user.userId);
  }
  
  @Delete(':id')
  async deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @Request() req
  ): Promise<void> {
    return this.tasksService.deleteTask(id, req.user.userId);
  }
}