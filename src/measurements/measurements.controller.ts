import { Controller } from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @MessagePattern('$share/group1/measurements/+')
  getNotifications(
    @Payload() createMeasurementDto: CreateMeasurementDto,
    @Ctx() context: MqttContext,
  ) {
    createMeasurementDto['sensorId'] = context.getTopic().split('/')[1];
    return this.measurementsService.create(createMeasurementDto);
  }
}
