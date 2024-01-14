import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
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
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('$share/group1/measurements/+')
  getNotifications(@Payload() data: Measurement, @Ctx() context: MqttContext) {
    console.log(data);
    console.log(`Topic: ${context.getTopic()}`);
    console.log(`Packet: ${JSON.stringify(context.getPacket())}`);
  }
}
