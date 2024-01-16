import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.MQTT,
      options: {
        url: process.env.MQTT_URL,
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD,
        clientId: uuidv4(),
      },
    },
  );

  await app.listen();
}
bootstrap();
