import { Module } from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { MeasurementsController } from './measurements.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { Measurement, MeasurementSchema } from './schemas/measurement.schema';
import { MongooseModule } from '@nestjs/mongoose';

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
    MongooseModule.forFeature([
      { name: Measurement.name, schema: MeasurementSchema },
    ]),
  ],
  controllers: [MeasurementsController],
  providers: [MeasurementsService],
})
export class MeasurementsModule {}
