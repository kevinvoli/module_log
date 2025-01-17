import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClientProxyFactory, MicroserviceOptions, Transport } from '@nestjs/microservices';
import axios from 'axios';
import * as net from 'net';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3004, // Port for NestJS service
    },
  });

  const serviceName = 'logService';
  const host = '127.0.0.1';
  const port = 3004; // Choose a different port

  // Register with Gateway (assuming Gateway listens on port 3003)
  try {
    await axios.post('http://127.0.0.1:3003/discovery/register', {
      name: serviceName,
      host: host,
      port: port,
      protocol: 'tcp',
    });

    
    console.log(`${serviceName} registered with Gateway`);
  } catch (error) {
    console.error('Error registering with Gateway:', error.message);
  }





   app.listen();


}

bootstrap();