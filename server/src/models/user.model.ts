import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  fullName: string;
  password: string;
  profilePic?: string;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;
