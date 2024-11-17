// import { Controller } from '@nestjs/common';

// @Controller('docker')
// export class DockerController {}



//2nd
// import { Controller, Get, Param, Post, Delete } from '@nestjs/common';
// import { DockerService } from './docker.service';

// @Controller('docker')
// export class DockerController {
//   constructor(private readonly dockerService: DockerService) {}

//   @Get('containers')
//   async getContainers() {
//     const containers = await this.dockerService.listContainers();
//     return containers;
//   }

//   @Post('containers/:id/start')
//   async startContainer(@Param('id') id: string) {
//     await this.dockerService.startContainer(id);
//     return `Container ${id} started`;
//   }

//   @Delete('containers/:id/stop')
//   async stopContainer(@Param('id') id: string) {
//     await this.dockerService.stopContainer(id);
//     return `Container ${id} stopped`;
//   }
// }
// docker.controller.ts


//3rd
import { Controller, Get, Post, Param, Logger } from '@nestjs/common';

@Controller('docker')
export class DockerController {
  private readonly logger = new Logger(DockerController.name);

  @Get('containers')
  getContainers() {
    this.logger.log('Fetching all containers');
    return 'List of containers';
  }

  @Post('containers/:id/start')
  startContainer(@Param('id') id: string) {
    this.logger.log(`Starting container with ID: ${id}`);
    return `Starting container ${id}`;
  }

  @Post('containers/:id/stop')
  stopContainer(@Param('id') id: string) {
    this.logger.log(`Stopping container with ID: ${id}`);
    return `Stopping container ${id}`;
  }
}
