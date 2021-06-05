import * as mongoose from 'mongoose'
import IUsers from "../models/users"
import ITicket from "../models/ticket"
import IProject from '../models/project'
import User from '../schemas/UserSchema'
import Project from '../schemas/ProjectSchema'
import Ticket from '../schemas/TicketSchema'


export default class TicketService{

    async addTicket(ticket: ITicket) {
        return new Promise((res, rej) => {
            this.notExists(ticket.taskName).then(async () => {
                const newTicket = new Ticket({
                    _id: new mongoose.Types.ObjectId(),
                    taskName: ticket.taskName,
                    description: ticket.description,
                    category: ticket.category,
                    status: ticket.status,
                    assignor: ticket.assignor,
                    assignees: ticket.assignees
                });
                await newTicket.save();
                res(true);
            }).catch((err) => {
                console.log(`ProjectService: addProject: Error: ${err}`);
                rej("Project exists");
            });
        })
    }


    private notExists = (taskName: string) => {
        return new Promise(async (res, rej) => {
            const task = await Project.findOne({ taskName: taskName }).exec();
            if (task) {
                rej("Task exists");
            }
            res(true);
        });
    };

    private exists = (taskName: string) => {
        return new Promise(async (res, rej) => {
            const task = await User.findOne({taskName: taskName}).exec();
            if(task){
                res(true);
            }
            rej("Task does not exists");
        })
    };

}