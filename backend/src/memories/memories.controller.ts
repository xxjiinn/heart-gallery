/*
Springboot에서의 Controller
*/


import { Controller, Get } from '@nestjs/common';
import { MemoriesService } from './memories.service';

@Controller('memories')
export class MemoriesController {
  constructor(private readonly memoriesService: MemoriesService) {}

  @Get()
  async findAll() {
    return this.memoriesService.findAll();
  }
}
