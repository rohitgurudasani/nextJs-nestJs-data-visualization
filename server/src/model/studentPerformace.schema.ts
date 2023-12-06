import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StudentPerformanceDocument = HydratedDocument<StudentPerformance>;

@Schema({ collection: 'students' })
export class StudentPerformance {
  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  'race/ethnicity': string;

  @Prop({ required: true })
  'parental level of education': string;

  @Prop({ required: true })
  lunch: string;

  @Prop({ required: true })
  'test preparation course': string;

  @Prop({ required: true })
  'math score': number;

  @Prop({ required: true })
  'reading score': number;

  @Prop({ required: true })
  'writing score': number;
}

export const StudentPerformanceSchema =
  SchemaFactory.createForClass(StudentPerformance);
