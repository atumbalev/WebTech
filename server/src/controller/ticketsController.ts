import { Request, Response } from 'express'
import Ticket from '../schemas/TicketSchema';
import ITicket from '../models/ticket';
import TicketService from '../services/ticketService'
import Project from '../schemas/ProjectSchema'

export const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    await TicketService.deleteTicket(id).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(404).send(err);
    });
}

export const updateByID = async (req: Request, res: Response) => {
    const { id } = req.params;
    const body: ITicket = req.body;
    await TicketService.updateTicket(body.id, body.taskName, body.description, body.category, body.status, body.assignor, body.assignees)
        .then(() => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
            res.sendStatus(401);
        })
}

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
            console.log(el.status);
            if(el.status === status){
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
    // res.send(Project.findOne(name:name).
    // populate({path:'tickets'}).exec());
}