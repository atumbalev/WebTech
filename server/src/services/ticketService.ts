import * as mongoose from 'mongoose'
import IUsers from "../models/users"
import ITicket from "../models/ticket"
import IProject from '../models/project'
import User from '../schemas/UserSchema'
import Project from '../schemas/ProjectSchema'
import Ticket from '../schemas/TicketSchema'


 class TicketService{

    async addTicket(projectName: string, ticket: ITicket) {
        return new Promise(async (res, rej) => {
            const project: IProject = await Project.findOne({ name: projectName }).exec();
            if (!project) {
                rej("Project not found!")
            }

            const newTicket = new Ticket({
                _id: new mongoose.Types.ObjectId(),
                taskName: ticket.taskName,
                description: ticket.description,
                category: ticket.category,
                status: ticket.status,
                assignor: ticket.assignor,
                assignees: ticket.assignees
            });

            const update = {$push: {'tickets': ticket}};
            try {
                await Project.findOneAndUpdate({name: 'Test Web'}, update).exec();
            } catch (err) {
                console.log(`TicketService: addTicket: Error: ${err}`);
                rej("Ticket exists");
            }

            res(true);
        })
    }
    
    private notExists = (taskName: string) => {
        return new Promise(async (res, rej) => {
            const task = await Ticket.findOne({ taskName: taskName }).exec();
            if (task) {
                rej("Task exists");
            }
            res(true);
        });
    };

    private exists = (taskName: string) => {
        return new Promise(async (res, rej) => {
            const task = await Ticket.findOne({taskName: taskName}).exec();
            if(task){
                res(true);
            }
            rej("Task does not exists");
        })
    };

    async getTicket(ID: string) : Promise<ITicket> {
        return new Promise<ITicket>(async (res, rej) => {
            const user: ITicket = await User.findOne({ _id: ID }).exec().then();
            if (user) {
                res(user);
            }
            rej("User does not exists");
        })
    };

    async deleteTicket(ID: string): Promise<Boolean>{
        return new Promise(async (res, rej) => {
            const deletedTicket = await Ticket.deleteOne({ _id: ID }).exec();
            if (deletedTicket) {
                res(true);
            }
            rej("Un successfully deleted");
        })
    };

    async updateTicket(
        id: mongoose.Types.ObjectId,
        taskName: string,
        assignor: string,
        description?: string,
        category?: string,
        status?: string,
        assignees?: string[]
    ):Promise<void> {
        const user = await Ticket.findOne({ _id: id }).exec().then(async (u: any) => {
            await Ticket.findOneAndUpdate(
                { _id: id },
                {
                    description: description,
                    category: category,
                    status: status,
                    assignees: assignees
                }
            )
        })
    };




}

export default new TicketService();