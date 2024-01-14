import { Injectable } from '@nestjs/common';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Measurement } from './schemas/measurement.schema';
import { Model } from 'mongoose';

@Injectable()
export class MeasurementsService {
  constructor(
    @InjectModel(Measurement.name) private measurementModel: Model<Measurement>,
  ) {}

  async create(
    createMeasurementDto: CreateMeasurementDto,
  ): Promise<Measurement> {
    const createdMeasurement = new this.measurementModel(createMeasurementDto);
    return createdMeasurement.save();
  }
}
