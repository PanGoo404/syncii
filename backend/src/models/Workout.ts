import { Schema, model } from 'mongoose';

export interface WorkoutI {
  title: string;
  description: string;
  sets: number;
  reps: number;
  rest: number;
  // rapsInSecs: boolean;
}

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    sets: { type: Number, default: 3 },
    reps: { type: Number, default: 10 },
    rest: { type: Number, default: 120 },
    // rapsInSecs: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<WorkoutI>('workout', workoutSchema);
