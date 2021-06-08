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
    type: String
    // type: Schema.Types.ObjectId,
    // ref: 'User',
    // required: true //??
  },
  description: String,
  tickets: [TicketSchema],
  contrubitors: [{
    //type: String
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Project = mongoose.model<IProject>('Project', projectSchema);
const ProjectSchema = projectSchema;

export {Project, ProjectSchema};
export default Project;