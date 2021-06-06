import { Router, Request, Response } from 'express';
import { deleteById, updateByID, addTask, getByAssignee, getByStatus, getByTasks } from '../controller/ticketsController'
import Project from '../schemas/ProjectSchema'
import {getTicket} from '../controller/projectController'
const router = Router();

router.get('/:name/tickets/assignee', getByAssignee); //raboti
router.get('/:name/tickets/status/:status', getByStatus);
router.get('/:name/tickets/tasks', getByTasks);

router.post('/:name/tickets/add', addTask);

router.delete('/:name/tickets/assignee/:id', deleteById);
router.delete('/:name/tickets/tasks/:id', deleteById);
router.delete('/:name/tickets/status/:id', deleteById);


router.patch('/:name/tickets/status/:id', updateByID);
router.patch('/:name/tickets/assignee/:id', updateByID);
router.patch('/:name/tickets/task/:id', updateByID);

export default router;