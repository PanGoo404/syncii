import { Schema, model } from 'mongoose';

interface WorkoutI {
  name: string;
  exercises: string[];
  sets: number;
  reps: number;
}

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model<WorkoutI>('Workout', workoutSchema);
