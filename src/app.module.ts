import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MEASUREMENTS',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://localhost:1883',
          username: 'test',
          password: 'test',
          clientId: uuidv4(),
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
