// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class DockerService {}


import { Injectable } from '@nestjs/common';
import Docker from 'dockerode';

@Injectable()
export class DockerService {
  private docker: Docker;

  constructor() {
    this.docker = new Docker({ socketPath: '/var/run/docker.sock' });
  }

  async listContainers() {
    return await this.docker.listContainers({ all: true });
  }

  async startContainer(containerId: string) {
    const container = this.docker.getContainer(containerId);
    return await container.start();
  }

  async stopContainer(containerId: string) {
    const container = this.docker.getContainer(containerId);
    return await container.stop();
  }
}
