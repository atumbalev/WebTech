import { Request, Response } from 'express'
import ITicket from '../models/ticket';
import TicketService from '../services/ticketService'
import Project from '../schemas/ProjectSchema'

export const addTask = async (req: Request, res: Response) => {
    const body: ITicket = req.body;
    const projectName: string = req.params.projectName;

    await TicketService.addTicket(projectName, body).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        res.status(400).send(err);
    });

}

export const getByAssignee = async (req: Request, res: Response) => {
    const name = req.params.name;

    const ticketsArr = await Project.findOne({ name: name }).select('tickets').exec();
    const currentTickets = ticketsArr.get('tickets', null, { getters: false });

    if (currentTickets) {
        let ticketsByAssignee: Array<any> = [];
        currentTickets.forEach((el: any) => {
            ticketsByAssignee.push({
                taskName: el.taskName,
                description: el.description,
                assignee: el.assignor,
                status: el.status,
                category: el.category
            });
        })
        res.status(200).json(ticketsByAssignee);
        return;
    }
    res.status(400).json("error: No tickets found");
}

export const getByStatus = async (req: Request, res: Response) => {//raboti
    const name = req.params.name;
    const status = req.params.status;

    const ticketsArr = await Project.findOne({ name: name }).select('tickets').exec();
    const currentTickets = ticketsArr.get('tickets', null, { getters: false });
    console.log(currentTickets);
    if (currentTickets) {
        let ticketsByStatus: Array<any> = [];
        currentTickets.forEach((el: any) => {
            if (el.status === status) {
                console.log(status);
                ticketsByStatus.push({
                    taskName: el.taskName,
                    description: el.description,
                    assignee: el.assignor,
                    status: el.status,
                    category: el.category
                });
            }
        })
        res.status(200).json(ticketsByStatus);
        return;
    }
    res.status(400).json("error: No tickets found");
}

export const getByTasks = async (req: Request, res: Response) => {
    const name = req.params.name;
    await Project.findOne({ name: name }).select('tickets').exec().then((p: any) => {
        res.status(200).json(p.tickets);
    }).catch(err => {
        res.status(400).send(err);
    });
}

export const getByCategory = async (req: Request, res: Response) => {
    const name = req.params.name;
    const category = req.params.category;

    const ticketsArr = await Project.findOne({ name: name }).select('tickets').exec();
    const currentTickets = ticketsArr.get('tickets', null, { getters: false });
    console.log(currentTickets);
    if (currentTickets) {
        let ticketsByStatus: Array<any> = [];
        currentTickets.forEach((el: any) => {
            console.log(el.category);
            if (el.category === category) {
                console.log(category);
                ticketsByStatus.push({
                    taskName: el.taskName,
                    description: el.description,
                    assignee: el.assignor,
                    status: el.status,
                    category: el.category
                });
            }
        })
        res.status(200).json(ticketsByStatus);
        return;
    }
    res.status(400).json("error: No tickets found");
}