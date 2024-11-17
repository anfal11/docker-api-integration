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


//2nd
// import { Injectable, Logger } from '@nestjs/common';
// const Docker = require('dockerode');

// @Injectable()
// export class DockerService {
//   private readonly logger = new Logger(DockerService.name);
//   private docker: any;

//   constructor() {
//     this.docker = new Docker({ socketPath: '/var/run/docker.sock' });
//   }

//   async listContainers() {
//     this.logger.log('Fetching container list...');
//     const containers = await this.docker.listContainers({ all: true });
//     this.logger.log(`Found containers: ${JSON.stringify(containers)}`);
//     return containers;
//   }

//   async startContainer(containerId: string) {
//     this.logger.log(`Starting container: ${containerId}`);
//     const container = this.docker.getContainer(containerId);
//     const result = await container.start();
//     this.logger.log(`Start result: ${JSON.stringify(result)}`);
//     return result;
//   }

//   async stopContainer(containerId: string) {
//     this.logger.log(`Stopping container: ${containerId}`);
//     const container = this.docker.getContainer(containerId);
//     const result = await container.stop();
//     this.logger.log(`Stop result: ${JSON.stringify(result)}`);
//     return result;
//   }
// }


import { Injectable, Logger } from '@nestjs/common';
import { Docker } from 'dockerode';

@Injectable()
export class DockerService {
  private readonly logger = new Logger(DockerService.name);
  private docker = new Docker();

  async fetchContainers(): Promise<void> {
    try {
      this.logger.log('Fetching container list...');

      // Fetch container list
      const containers = await this.docker.listContainers({ all: true });

      // Log in a cleaner, readable format
      containers.forEach((container) => {
        this.logger.log(
          `Container ID: ${container.Id}\n` +
          `Image: ${container.Image}\n` +
          `Names: ${container.Names.join(', ')}\n` +
          `Status: ${container.Status}\n` +
          `Ports: ${container.Ports.map(p => `${p.PrivatePort}->${p.PublicPort}`).join(', ')}\n` +
          `Created: ${new Date(container.Created * 1000).toLocaleString()}\n` +
          '-----------------------------------------'
        );
      });
    } catch (error) {
      this.logger.error('Error fetching containers:', error.message);
    }
  }
}
