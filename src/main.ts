import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClientProxyFactory, MicroserviceOptions, Transport } from '@nestjs/microservices';
import axios from 'axios';
import * as net from 'net';
import * as os from 'os'
import { ValidationPipe } from '@nestjs/common';


function getLocalIPAddress(): string {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address; // Retourne la première adresse IPv4 non interne
      }
    }
  }
  return '127.0.0.1'; // Adresse de repli si aucune adresse n'est trouvée
}


async function bootstrap() {
  const host = getLocalIPAddress()
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: host,
      port: 3004, // Port for NestJS service
    },
  });

  const serviceName = 'logService';
  const port = '3004'; // Choose a different port

  // Register with Gateway (assuming Gateway listens on port 3003)
  try {
    await axios.post('http://localhost:3003/discovery/register', {
      nom: serviceName,
      host: host,
      port: port,
      protocole: 'tcp',
      cleApi: "sqdfghjkljhgfds"
    });

    
    console.log(`${serviceName} registered with Gateway`);
  } catch (error) {
    console.error('Error registering with Gateway:', error.message);
  }

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }));
   app.listen();


}

bootstrap();