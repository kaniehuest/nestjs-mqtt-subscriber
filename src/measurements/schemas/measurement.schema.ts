import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type MeasurementDocument = mongoose.HydratedDocument<Measurement>;

@Schema()
export class Measurement {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  sensorId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  timestamp: Date;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  values: mongoose.Schema.Types.Mixed;
}

export const MeasurementSchema = SchemaFactory.createForClass(Measurement);
