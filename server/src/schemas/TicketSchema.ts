import * as mongoose from 'mongoose';
import ITicket from '../models/ticket'
const { Schema } = mongoose;

const ticketSchema = new Schema<ITicket>({
    _id:  Schema.Types.ObjectId,
    taskName: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    category: {
      type: String,
      enum: ['Open', 'In progress', 'Resolved', 'Closed'],
      required: true,
    },
    status:{
      type: Number,
      enum: ['1', '2', '3', '4', '5'],
      required: true,
    },
    assignor: {
      type: Schema.Types.ObjectId,
      refPath: 'onModel',
      //required: true,
    },
    assignees: [{
      type: Schema.Types.ObjectId,
      refPath: 'onModel'
    }]
})

const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema);
const TicketSchema = ticketSchema;

export {Ticket, TicketSchema};
export default Ticket;