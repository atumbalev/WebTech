import * as express from 'express';
import * as projectEndpoints from '../controller/projectController'
import ticketsRoutes from './ticketsRouter'

    const router = express.Router();

//5
router.get('/:email', projectEndpoints.getAllProjects);//raboti

router.post('/:email',projectEndpoints.postNewProject);

//6
router.get('/:name/tickets/:ticketName',projectEndpoints.getTicket);//raboti

router.put('/:name/tickets/:ticketName', projectEndpoints.putTicket);

router.post('/:name/tickets/:ticketName', projectEndpoints.postTicket);

router.delete('/:name/tickets/:ticketName', projectEndpoints.deleteTicket);

//7
router.get('/:name/users', projectEndpoints.getAllContributers);//raboti

// router.delete('/:name/users', projectEndpoints.deleteContributer);//nqma front-end


//tickets
router.use('/',ticketsRoutes)



export default router;