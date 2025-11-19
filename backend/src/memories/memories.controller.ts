/*
Springboot에서의 Controller
*/


import { Controller, Get, Post, Body } from '@nestjs/common';
import { MemoriesService } from './memories.service';

@Controller('memories')
export class MemoriesController {
  constructor(private readonly memoriesService: MemoriesService) {}

  @Get()
  async findAll() {
    return this.memoriesService.findAll();
  }

  @Post()
  async create(@Body() body: { imageData: string; message: string }) {
    return this.memoriesService.create(body.imageData, body.message);
  }
}
