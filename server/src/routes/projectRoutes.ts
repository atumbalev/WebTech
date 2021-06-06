import * as express from 'express';
import * as projectEndpoints from '../controller/projectController'
import ticketsRoutes from './ticketsRouter'

const router = express.Router();

//5
router.get('/:ID', projectEndpoints.getAllProjects);

router.post('/:ID',projectEndpoints.postNewProjects);

//6
router.get('/:ID/tickets',projectEndpoints.getAllTickets);

router.put('/:ID/tickets', projectEndpoints.putTicket);

router.delete('/:ID/tickets', projectEndpoints.deleteAllTickets);

//7
router.get('/:ID/users', projectEndpoints.getAllContributers);

router.delete('/:ID/users', projectEndpoints.deleteContributer);


//tickets
router.use('/:ID/tickets',ticketsRoutes)


export default router;