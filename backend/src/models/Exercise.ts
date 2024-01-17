import { Schema, model } from 'mongoose';

export interface ExerciseI {
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
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    repsAsTime: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

export default model<ExerciseI>('Exercise', exerciseSchema);
