import { Schema, model } from 'mongoose';
import bc from 'bcryptjs';

export interface UserI {
  name: string;
  login: string;
  password: string;
  history: string[];
  isAdmin: boolean;
  checkPasswd: (password: string) => Promise<boolean>;
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    history: [{ type: Schema.Types.ObjectId, ref: 'Workout' }],
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  this.password = await bc.hash(this.password, 12);
});

userSchema.methods.checkPasswd = async function (password: string) {
  return await bc.compare(password, this.password);
};

export default model<UserI>('User', userSchema);
