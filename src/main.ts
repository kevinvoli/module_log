import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import axios from 'axios';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3004, // Port pour ce microservice
    },
  });

  const serviceName = 'logService';
  const host = '127.0.0.1';
  const port = 3004

  // Enregistrer ce service auprès du Gateway
  try {
    await axios.post('http://127.0.0.1:3003/discovery/register', {
      name: serviceName,
      host: host,
      port: port,
      protocole: 'tcp'
    });
    console.log(`${serviceName} enregistré auprès du Gateway`);
  } catch (error) {
    console.error('Erreur lors de l’enregistrement auprès du Gateway', error.message);
  }

  await app.listen();
}
bootstrap();
