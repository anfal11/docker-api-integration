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


//3rd
// import { Injectable, Logger } from '@nestjs/common';
// import { Docker } from 'dockerode';

// @Injectable()
// export class DockerService {
//   private readonly logger = new Logger(DockerService.name);
//   private docker = new Docker();

//   async fetchContainers(): Promise<void> {
//     try {
//       this.logger.log('Fetching container list...');

//       // Fetch container list
//       const containers = await this.docker.listContainers({ all: true });

//       // Log in a cleaner, readable format
//       containers.forEach((container) => {
//         this.logger.log(
//           `Container ID: ${container.Id}\n` +
//           `Image: ${container.Image}\n` +
//           `Names: ${container.Names.join(', ')}\n` +
//           `Status: ${container.Status}\n` +
//           `Ports: ${container.Ports.map(p => `${p.PrivatePort}->${p.PublicPort}`).join(', ')}\n` +
//           `Created: ${new Date(container.Created * 1000).toLocaleString()}\n` +
//           '-----------------------------------------'
//         );
//       });
//     } catch (error) {
//       this.logger.error('Error fetching containers:', error.message);
//     }
//   }

//   // Method to list containers
//   async listContainers(): Promise<any> {
//     try {
//       this.logger.log('Fetching container list...');
//       return await this.docker.listContainers({ all: true });
//     } catch (error) {
//       this.logger.error('Error listing containers:', error.message);
//       throw error;
//     }
//   }

//   // Method to start a container
//   async startContainer(containerId: string): Promise<void> {
//     try {
//       const container = this.docker.getContainer(containerId);
//       await container.start();
//       this.logger.log(`Container ${containerId} started successfully`);
//     } catch (error) {
//       this.logger.error(`Error starting container ${containerId}:`, error.message);
//       throw error;
//     }
//   }

//   // Method to stop a container
//   async stopContainer(containerId: string): Promise<void> {
//     try {
//       const container = this.docker.getContainer(containerId);
//       await container.stop();
//       this.logger.log(`Container ${containerId} stopped successfully`);
//     } catch (error) {
//       this.logger.error(`Error stopping container ${containerId}:`, error.message);
//       throw error;
//     }
//   }
// }






// 3rdd
// import { Injectable, Logger } from '@nestjs/common';
// import { Docker } from 'dockerode';
// import * as path from 'path';
// import * as fs from 'fs';

// @Injectable()
// export class DockerService {
//   private readonly logger = new Logger(DockerService.name);
//   private docker = new Docker();

//   // Utility function to find the working directory based on Docker Compose file location
//   private getWorkingDirectory(composeFilePath: string): string {
//     // Assuming the Docker Compose file is located at the root of the service
//     const dirPath = path.dirname(composeFilePath); // Get directory of the Compose file
//     this.logger.log(`Using working directory: ${dirPath}`);
//     return dirPath;
//   }

//   // Method to fetch containers
//   async fetchContainers(): Promise<void> {
//     try {
//       this.logger.log('Fetching container list...');

//       // Fetch container list
//       const containers = await this.docker.listContainers({ all: true });

//       // Log in a cleaner, readable format
//       containers.forEach((container) => {
//         this.logger.log(
//           `Container ID: ${container.Id}\n` +
//           `Image: ${container.Image}\n` +
//           `Names: ${container.Names.join(', ')}\n` +
//           `Status: ${container.Status}\n` +
//           `Ports: ${container.Ports.map(p => `${p.PrivatePort}->${p.PublicPort}`).join(', ')}\n` +
//           `Created: ${new Date(container.Created * 1000).toLocaleString()}\n` +
//           '-----------------------------------------'
//         );
//       });
//     } catch (error) {
//       this.logger.error('Error fetching containers:', error.message);
//     }
//   }

//   // Method to list containers
//   async listContainers(): Promise<any> {
//     try {
//       this.logger.log('Fetching container list...');
//       return await this.docker.listContainers({ all: true });
//     } catch (error) {
//       this.logger.error('Error listing containers:', error.message);
//       throw error;
//     }
//   }

//   // Method to start a container
//   async startContainer(containerId: string, composeFilePath: string): Promise<void> {
//     try {
//       const container = this.docker.getContainer(containerId);

//       // Get the working directory from the compose file location
//       const workingDir = this.getWorkingDirectory(composeFilePath);

//       // Starting container with a specified working directory
//       await container.start({
//         Cmd: ['/bin/bash'],  // Or any other command you need to run
//         workingDir: workingDir,  // Set the working directory dynamically
//       });

//       this.logger.log(`Container ${containerId} started successfully with working directory ${workingDir}`);
//     } catch (error) {
//       this.logger.error(`Error starting container ${containerId}:`, error.message);
//       throw error;
//     }
//   }

//   // Method to stop a container
//   async stopContainer(containerId: string): Promise<void> {
//     try {
//       const container = this.docker.getContainer(containerId);
//       await container.stop();
//       this.logger.log(`Container ${containerId} stopped successfully`);
//     } catch (error) {
//       this.logger.error(`Error stopping container ${containerId}:`, error.message);
//       throw error;
//     }
//   }
// }




//4th
// import { Injectable } from '@nestjs/common';
// // import * as Docker from 'dockerode';
// import Docker from 'dockerode';

// @Injectable()
// export class DockerService {
//   private docker: Docker;

//   constructor() {
//     this.docker = new Docker();
//   }

//   async startContainer(containerId: string): Promise<string> {
//     try {
//       const container = this.docker.getContainer(containerId);

//       // Attempt to start the container
//       await container.start();

//       // Fetch container details
//       const containerInfo = await container.inspect();

//       // Ensure mappings are typed correctly
//       const containerDetails = `
//         Container ID: ${containerInfo.Id}\n
//         Image: ${containerInfo.Image}\n
//         Names: ${containerInfo.Names.join(', ')}\n
//         Status: ${containerInfo.State.Status}\n
//         Ports: ${containerInfo.NetworkSettings.Ports
//           ? Object.entries(containerInfo.NetworkSettings.Ports)
//               .map(([port, mappings]) => {
//                 // Explicitly cast mappings to the correct type
//                 const ports = mappings as { HostPort: string }[];
//                 return `${port} -> ${ports.map(m => m.HostPort).join(', ')}`;
//               })
//               .join(', ')
//           : 'No ports mapped'}\n
//         Created: ${new Date(containerInfo.Created * 1000).toLocaleString()}\n
//       `;

//       return containerDetails;
//     } catch (error) {
//       console.error(`Error starting container ${containerId}:`, error);
//       return `Error starting container ${containerId}: ${error.message}`;
//     }
//   }

//   async listContainers(): Promise<string> {
//     try {
//       const containers = await this.docker.listContainers({ all: true });

//       const containerList = containers
//         .map((container) => {
//           return `
//             Container ID: ${container.Id}\n
//             Image: ${container.Image}\n
//             Names: ${container.Names.join(', ')}\n
//             Status: ${container.Status}\n
//             Ports: ${container.Ports.map((p) => `${p.PrivatePort} -> ${p.PublicPort}`).join(', ')}\n
//             Created: ${new Date(container.Created * 1000).toLocaleString()}\n
//           `;
//         })
//         .join('\n');

//       return containerList;
//     } catch (error) {
//       console.error('Error listing containers:', error);
//       return `Error listing containers: ${error.message}`;
//     }
//   }

//   async stopContainer(containerId: string): Promise<string> {
//     try {
//       const container = this.docker.getContainer(containerId);

//       // Attempt to stop the container
//       await container.stop();

//       return `Container ${containerId} stopped successfully.`;
//     } catch (error) {
//       console.error(`Error stopping container ${containerId}:`, error);
//       return `Error stopping container ${containerId}: ${error.message}`;
//     }
//   }
// }



//5th 

import { Injectable, Logger } from '@nestjs/common';
import Docker from 'dockerode';

@Injectable()
export class DockerService {
  private readonly docker: Docker;
  private readonly logger = new Logger(DockerService.name);

  constructor() {
    this.docker = new Docker(); // Ensure Dockerode is initialized correctly
  }

  async listContainers(): Promise<any[]> {
    try {
      const containers = await this.docker.listContainers({ all: true });
      this.logger.log(`Fetched ${containers.length} containers`);
      return containers;
    } catch (error) {
      this.logger.error('Error fetching containers:', error);
      throw error;
    }
  }
}
