import { Request, Response } from 'express'
import TicketService from '../services/ticketService';
import Ticket from '../schemas/TicketSchema';
import ITicket from '../models/ticket';

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