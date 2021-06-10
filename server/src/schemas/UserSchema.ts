import * as mongoose from 'mongoose';
import IUser from '../models/users';
import { Project, ProjectSchema } from './ProjectSchema'
const { Schema } = mongoose;

const userSchema = new Schema<IUser>({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  },
  password: {
    type: String,
    required: true,
    // min: (8),
    // regex: (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/) //special/number/capital
  },
  phone: String,
  description: String,
  
  profilePicture: {
    data: Buffer,
    contentType: String
  },
  
  authToken: String,
  projects: [ProjectSchema]
});

const User = mongoose.model<IUser>('User', userSchema);



export default User;