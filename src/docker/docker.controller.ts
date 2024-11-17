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
import { Controller, Get, Param } from '@nestjs/common';
import { DockerService } from './docker.service';

@Controller('docker')
export class DockerController {
  constructor(private readonly dockerService: DockerService) {}

  @Get('start/:id')
  async startContainer(@Param('id') id: string) {
    const containerDetails = await this.dockerService.startContainer(id);
    return containerDetails;  // Return detailed information about the container
  }
}
