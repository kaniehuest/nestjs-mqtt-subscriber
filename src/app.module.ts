import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeasurementsModule } from './measurements/measurements.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MeasurementsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
