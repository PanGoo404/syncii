import { Schema, model } from 'mongoose';

interface ExerciseI {
  name: string;
  description?: string;
  muscleGroup?: string;
  repsAsTime: boolean;
}

const exerciseSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    muscleGroup: { type: String },
    repsAsTime: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

export default model<ExerciseI>('Exercise', exerciseSchema);