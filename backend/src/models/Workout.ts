import { Schema, model } from 'mongoose';

export interface WorkoutI {
  name: string;
  exercises: string[];
  sets: number;
  reps: number;
}

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
  },
  { timestamps: true }
);

export default model<WorkoutI>('Workout', workoutSchema);
