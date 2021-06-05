import * as mongoose from 'mongoose';
import IUser from '../models/users'
const { Schema } = mongoose;

const userSchema = new Schema<IUser>({
  _id:  Schema.Types.ObjectId, 
  name: {
    type: String,
    required: true,
  },
  email:  {
    type: String,
    required: true,
    unique: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  }, 
  password: {
    type: String,
    required: true,
  }, 
  phone: String,
  description: String ,
  profilePicture: Buffer,
  authToken: String,
  projects: [{
    type: Schema.Types.ObjectId,
    refPath: 'onModel'
  }],
  onModel:{
    type: String,
    required: true,
    enum: ['Project']
  }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;