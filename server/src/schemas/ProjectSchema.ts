import * as mongoose from 'mongoose';
import IProject from '../models/project'

import {Ticket, TicketSchema} from './TicketSchema'
const { Schema } = mongoose;

const projectSchema = new Schema<IProject>({
  _id:  Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
},
  creator: {
    type: Schema.Types.ObjectId,
    refPath: 'onModel',
    required: true //??
  },
  description: String,
  tickets: [TicketSchema],
  contrubitors: [{
    type: Schema.Types.ObjectId,
    refPath: 'onModel'
  }],
  onModel:{
    type: String,
    required: true,
    enum: ['User']
  }
});

const Project = mongoose.model<IProject>('Project', projectSchema);

export default Project;