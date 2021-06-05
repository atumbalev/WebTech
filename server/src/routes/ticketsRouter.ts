import { Router, Request, Response } from 'express';
import { deleteById, updateByID } from '../controller/ticketsController'
import Project from '../schemas/ProjectSchema'
import {getAllTickets} from '../controller/projectController'
const router = Router();

router.get('/assignee', (req: Request,res: Response) => {
    res.send(Project.find().populate({path:'tickets', 
    select: ['taskName', 'description', 'assigneeID', 'status', 'category']}).exec());
});

router.get('/status', (req: Request, res: Response) => {
    const status = req.params;
    res.send(Project.find().
    populate({path:'tickets', match: {status: status},
     select: ['taskName', 'description', 'assigneeID', 'status', 'category']}).exec());
});

router.get('/tasks', (req: Request, res: Response) => {
    const status = req.params;
    res.send(Project.find().
    populate({path:'tickets'}).exec());
});

router.delete('/assignee/:id', deleteById);
router.delete('/tasks/:id', deleteById);
router.delete('/status/:id', deleteById);


router.patch('/status/:id', updateByID);
router.patch('/assignee/:id', updateByID);
router.patch('/task/:id', updateByID);

export default router;