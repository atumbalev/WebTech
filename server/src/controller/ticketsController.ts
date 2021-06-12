import { Request, Response } from 'express'
import ITicket from '../models/ticket';
import TicketService from '../services/ticketService'
import Project from '../schemas/ProjectSchema'



export const putTicket = async (req: Request, res: Response) => {
    const name = req.params.name;
    const taskName = req.params.ticketName;
    const ticket = req.body;
    if (!name || !taskName || !ticket) {
        res.status(400).json("error: Invalid input");
        return;
    }

    const updatedTicket = await TicketService.updateTicket(name, taskName, ticket.description, ticket.category,
        ticket.status, ticket.assignee)
        .then(() => {
            res.status(200).json({ "updatedTicket": updatedTicket });
            return;
        }).catch((err: Error) => {
            res.send(304).json({ "error": err });
        })
};

export const postTicket = async (req: Request, res: Response) => {
    const name = req.params.name;
    const newTicket = req.body;
    if (!name || !newTicket) {
        res.status(400).json("error: Invalid input");
        return;
    }

    await TicketService.addTicket(name, newTicket)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err: Error) => {
            res.status(304).json({ "error": err });
        });
}

export const getByAssignee = async (req: Request, res: Response) => {
    const name = req.params.name;
    if (!name) {
        res.status(400).json("error: Invalid input");
        return;
    }

    const ticketsByAssignee = await TicketService.getByAssignee(name)
        .then(() => {
            res.status(200).json(ticketsByAssignee);
            return;
        })
        .catch((err: Error) => {
            res.status(405).json({ "err": err });
            return;
        });
}

export const getByStatus = async (req: Request, res: Response) => {//raboti
    const name = req.params.name;
    const status = req.params.status;
    if (!name || !status) {
        res.status(400).json("error: Invalid input");
        return;
    }
    const ticketsByStatus = await TicketService.getByStatus(name, status)
        .then(() => {
            res.status(200).json(ticketsByStatus);
            return;
        })
        .catch((err: Error) => {
            res.status(405).json({ "err": err });
            return;
        });

}

export const getByTasks = async (req: Request, res: Response) => {
    const name = req.params.name;
    if (!name) {
        res.status(400).json("error: Invalid input");
        return;
    }
    await Project.findOne({ name: name }).select('tickets').exec()
        .then((p: any) => {
            res.status(200).json(p.tickets);
            return;
        })
        .catch((err: Error) => {
            res.status(400).json({ "error": err });
            return;
        });
}

export const getByCategory = async (req: Request, res: Response) => {
    const name = req.params.name;
    const category = req.params.category;

    if (!name || !category) {
        res.status(400).json("error: Invalid input");
        return;
    }
    const ticketsByCategory = await TicketService.getByCategory(name, category)
        .then(() => {
            res.status(200).json(ticketsByCategory);
            return;
        })
        .catch((err: Error) => {
            res.status(405).json({ "error": err });
            return;
        });
}