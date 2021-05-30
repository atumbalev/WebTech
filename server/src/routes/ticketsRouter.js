import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { deleteById, updateByID } from '../controllers/ticketsController.js'
import { sortByAssignee, sortByStatus } from '../helperFunctions/helper.js'
const router = express.Router();
let tickets = [{
    taskName: 'sth',
    description: 'jfjfj',
    categoty: 'ndd',
    status: '5',
    assignee: 'njdfnjff',
    participants: 'ndjnd'
}];

router.get('/assignee', (req, res) => {
    res.send(sortByAssignee(tickets));
});
router.get('/tasks', (req, res) => {
    res.send(tickets);
});
router.get('/status', (req, res) => {
    res.send(sortByStatus(tickets, req.body));
});
/*
router.post('/assignee', addTicket);
router.post('/tasks', addTicket);
router.post('/status', addTicket);*/

router.delete('/assignee/:id', deleteById);
router.delete('/tasks/:id', deleteById);
router.delete('/status/:id', deleteById);

router.patch('/status/:id', updateByID);
router.patch('/assignee/:id', updateByID);
router.patch('/task/:id', updateByID);

export default router;