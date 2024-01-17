import { Schema, model } from 'mongoose';

export interface WorkoutI {
  name: string;
  exercises: string[];
}

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
  },
  { timestamps: true }
);

export default model<WorkoutI>('Workout', workoutSchema);
