// // import { Injectable } from '@nestjs/common';

// // @Injectable()
// // export class DockerService {}


// import { Injectable } from '@nestjs/common';
// import Docker from 'dockerode';

// @Injectable()
// export class DockerService {
//   private docker: Docker;

//   constructor() {
//     this.docker = new Docker({ socketPath: '/var/run/docker.sock' });
//   }

//   async listContainers() {
//     return await this.docker.listContainers({ all: true });
//   }

//   async startContainer(containerId: string) {
//     const container = this.docker.getContainer(containerId);
//     return await container.start();
//   }

//   async stopContainer(containerId: string) {
//     const container = this.docker.getContainer(containerId);
//     return await container.stop();
//   }
// }
import { Injectable, Logger } from '@nestjs/common';
const Docker = require('dockerode');

@Injectable()
export class DockerService {
  private readonly logger = new Logger(DockerService.name);
  private docker: any;

  constructor() {
    this.docker = new Docker({ socketPath: '/var/run/docker.sock' });
  }

  async listContainers() {
    this.logger.log('Fetching container list...');
    const containers = await this.docker.listContainers({ all: true });
    this.logger.log(`Found containers: ${JSON.stringify(containers)}`);
    return containers;
  }

  async startContainer(containerId: string) {
    this.logger.log(`Starting container: ${containerId}`);
    const container = this.docker.getContainer(containerId);
    const result = await container.start();
    this.logger.log(`Start result: ${JSON.stringify(result)}`);
    return result;
  }

  async stopContainer(containerId: string) {
    this.logger.log(`Stopping container: ${containerId}`);
    const container = this.docker.getContainer(containerId);
    const result = await container.stop();
    this.logger.log(`Stop result: ${JSON.stringify(result)}`);
    return result;
  }
}
