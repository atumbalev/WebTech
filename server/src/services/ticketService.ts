import * as mongoose from 'mongoose'
import IUsers from "../models/users"
import ITicket from "../models/ticket"
import IProject from '../models/project'
import User from '../schemas/UserSchema'
import Project from '../schemas/ProjectSchema'
import Ticket from '../schemas/TicketSchema'


class TicketService {

    async addTicket(name: string, ticket: ITicket) {
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

                Project.updateOne({ name: name }, { $addToSet: { tickets: newTicket } }).exec();

                res(true);
            }).catch((err) => {
                console.log(`ProjectService: addProject: Error: ${err}`);
                rej("Project exists");
            });
        })
    }

    notExists = (taskName: string) => {
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
            const task = await Ticket.findOne({ taskName: taskName }).exec();
            if (task) {
                res(true);
            }
            rej("Task does not exists");
        })
    };

    async deleteTicket(name: string, taskName: string): Promise<Boolean> {
        return new Promise(async (res, rej) => {

            const deletedTicket = await Ticket.deleteOne({ taskName: name }).exec();
            if (deletedTicket) {
                res(true);
            }
            rej("Un successfully deleted");
        })
    };

    async updateTicket(
        name: string,
        taskName: string,
        description?: string,
        category?: string,
        status?: string,
        assignees?: [string]
      ){
        return new Promise(async (resolve, reject) => {
          const project = await Project.findOne({ name: name })
            .select('tickets')
            .exec();
          console.log(project.tickets);
          if (project) {
            let tickets = project.tickets;
            tickets.forEach((el: any) => {
              if (el.taskName === taskName) {
                el.description = description === null ? el.description : description;
                el.category = category === null ? el.category : category;
                el.status = status === null ? el.status : status;
                el.assignees = assignees === null ? el.assignees : assignees;
              }
            });
            console.log(tickets);
    
            Project.findOneAndUpdate({ name: name }, { tickets: tickets })
              .exec()
              .then((p: any) => {
                console.log(p);
                resolve(true);
              })
              .catch((err: Error) => reject(err));
          } else {
            reject('No project found');
          }
        });
      };
}

export default new TicketService();