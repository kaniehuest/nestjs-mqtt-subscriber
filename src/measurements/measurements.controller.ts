import { Controller } from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { InfluxDB, Point } from '@influxdata/influxdb-client';

@Controller()
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  influxDB = new InfluxDB({
    url: process.env.INFLUXDB_URL,
    token: process.env.INFLUXDB_TOKEN,
  });

  @MessagePattern('$share/group1/measurements/+')
  getNotifications(
    @Payload() createMeasurementDto: CreateMeasurementDto,
    @Ctx() context: MqttContext,
  ) {
    const sensorId = context.getTopic().split('/')[1];
    console.log(createMeasurementDto['values']['temperature']);

    const point1 = new Point('temperature')
      .tag('sensor_id', sensorId)
      .floatField('value', createMeasurementDto['values']['temperature']);

    const writeApi = this.influxDB.getWriteApi('test', 'sample-bucket');

    writeApi.writePoint(point1);

    writeApi
      .close()
      .then()
      .catch((e) => console.log(e));

    createMeasurementDto['sensorId'] = sensorId;
    return this.measurementsService.create(createMeasurementDto);
  }
}
