import * as express from 'express';
import * as projectEndpoints from '../controller/projectController'
import ticketsRoutes from './ticketsRouter'

const router = express.Router();

//5
router.get('/:ID', projectEndpoints.getAllProjects);

router.post('/:ID',projectEndpoints.posNewProjects);

//6
router.get('/:projectID/tickets',projectEndpoints.getAllTickets);

router.put('/:projectID/tickets', projectEndpoints.putNewTicket);

router.delete('/:projectID/tickets', projectEndpoints.deleteAllTickets);

//7
router.get('/:projectID/users', projectEndpoints.getAllContributers);

router.delete('/:projectID/users', projectEndpoints.deleteContributer);


//tickets
router.use('/:ID/tickets',ticketsRoutes)


export default router;