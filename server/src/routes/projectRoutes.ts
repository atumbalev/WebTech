import * as express from 'express';
import * as projectController from '../controller/projectController'
import * as ticketsController from '../controller/ticketsController'
import ticketsRoutes from './ticketsRouter'

const router = express.Router();

//5
router.get('/:email', projectController.getAllProjects);

router.post('/:email',projectController.postNewProject);//needs to be fixed

//6
router.get('/:name/tickets/:ticketName',projectController.getTickets);

router.put('/:name/tickets/:ticketName', ticketsController.putTicket);

router.post('/:name/tickets', ticketsController.postTicket);

router.delete('/:name/tickets/:ticketName', projectController.deleteTicket);

router.post('/:name/contributers', projectController.addContributer);

//7
router.get('/:name/users', projectController.getAllContributers);




//tickets
router.use('/',ticketsRoutes);



export default router;