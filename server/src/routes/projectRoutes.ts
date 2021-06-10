import * as express from 'express';
import * as projectController from '../controller/projectController'
import ticketsRoutes from './ticketsRouter'

    const router = express.Router();

//5
router.get('/:email', projectController.getAllProjects);//raboti

router.post('/:email',projectController.postNewProject);//raboti

//6
router.get('/:name/tickets/:ticketName',projectController.getTicket);//raboti

router.put('/:name/tickets/:ticketName', projectController.putTicket);//raboti

router.post('/:name/tickets', projectController.postTicket);//raboti

router.delete('/:name/tickets/:ticketName', projectController.deleteTicket);//raboti

//7
router.get('/:name/users', projectController.getAllContributers);//raboti




//tickets
router.use('/',ticketsRoutes)



export default router;