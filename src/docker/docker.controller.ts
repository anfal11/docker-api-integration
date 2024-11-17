// import { Controller } from '@nestjs/common';

// @Controller('docker')
// export class DockerController {}
import { Controller, Get, Param, Post } from '@nestjs/common';
import { DockerService } from './docker.service';

@Controller('docker')
export class DockerController {
  constructor(private readonly dockerService: DockerService) {}

  @Get('containers')
  async listContainers() {
    return await this.dockerService.listContainers();
  }

  @Post('containers/:id/start')
  async startContainer(@Param('id') id: string) {
    return await this.dockerService.startContainer(id);
  }

  @Post('containers/:id/stop')
  async stopContainer(@Param('id') id: string) {
    return await this.dockerService.stopContainer(id);
  }
}
