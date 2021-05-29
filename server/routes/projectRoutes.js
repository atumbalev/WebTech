import { Router } from 'express';
import {getAllProjects, posNewProjects,getAllTickets, putNewTicket,deleteAllTickets,getAllContributers,deleteContributer} from '../controllers/projectController.js'
const router = Router();

//5
router.get('/:ID', getAllProjects);

router.post('/:ID',posNewProjects);

//6
router.get('/:projectID/tickets',getAllTickets);

router.put('/:projectID/tickets', putNewTicket);

router.delete('/:projectID/tickets', deleteAllTickets);

//7
router.get('/:projectID/users', getAllContributers);

router.delete('/:projectID/users', deleteContributer);

export default router;