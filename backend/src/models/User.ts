import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserI {
  name: string;
  login: string;
  password: string;
  workouts: string[];
  checkPasswd: (password: string) => Promise<boolean>;
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    history: [{ type: Schema.Types.ObjectId, ref: 'Workout' }],
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 2);
});

userSchema.methods.checkPasswd = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export default model<UserI>('user', userSchema);
