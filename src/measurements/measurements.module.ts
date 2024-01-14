import { Module } from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { MeasurementsController } from './measurements.controller';
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
  controllers: [MeasurementsController],
  providers: [MeasurementsService],
})
export class MeasurementsModule {}
