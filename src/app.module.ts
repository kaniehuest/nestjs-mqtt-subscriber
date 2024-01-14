import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeasurementsModule } from './measurements/measurements.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:root@localhost:27017/sensors-iot?authSource=admin',
    ),
    MeasurementsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
