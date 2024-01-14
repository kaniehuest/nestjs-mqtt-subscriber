import { Controller } from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';

interface Measurement {
  timestamp: string;
  value: number;
}

@Controller()
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @MessagePattern('$share/group1/measurements/+')
  getNotifications(@Payload() data: Measurement, @Ctx() context: MqttContext) {
    console.log(data);
    console.log(`Topic: ${context.getTopic()}`);
    console.log(`Packet: ${JSON.stringify(context.getPacket())}`);
  }

  @MessagePattern('createMeasurement')
  create(@Payload() createMeasurementDto: CreateMeasurementDto) {
    return this.measurementsService.create(createMeasurementDto);
  }

  @MessagePattern('findAllMeasurements')
  findAll() {
    return this.measurementsService.findAll();
  }

  @MessagePattern('findOneMeasurement')
  findOne(@Payload() id: number) {
    return this.measurementsService.findOne(id);
  }

  @MessagePattern('updateMeasurement')
  update(@Payload() updateMeasurementDto: UpdateMeasurementDto) {
    return this.measurementsService.update(
      updateMeasurementDto.id,
      updateMeasurementDto,
    );
  }

  @MessagePattern('removeMeasurement')
  remove(@Payload() id: number) {
    return this.measurementsService.remove(id);
  }
}
