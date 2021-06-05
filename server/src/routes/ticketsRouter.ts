import { Router, Request, Response } from 'express';
import { deleteById, updateByID } from '../controller/ticketsController'
import { sortByAssignee, sortByStatus } from '../helpers/sortHelper'
import Ticket from '../models/ticketInterface'

const router = Router();

let tickets:Ticket[] = [];

router.get('/assignee', (req: Request,res: Response) => {
    res.send(sortByAssignee(tickets));
});

router.get('/status', (req: Request, res: Response) => {
    res.send(sortByStatus(tickets, "In progress"));
});

router.delete('/assignee/:id', deleteById);

router.delete('/tasks/:id', deleteById);

router.delete('/status/:id', deleteById);


router.patch('/status/:id', updateByID);

router.patch('/assignee/:id', updateByID);

router.patch('/task/:id', updateByID);

export default router;