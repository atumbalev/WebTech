import * as express from 'express'
import {getTickets, addTicketToProject, removeTicketFromProject} from '../controller/ticketActionsController'
import HelperService from '../services/helperService'

const tickets:  express.Router = express.Router();

tickets.get('projects/:id/tickets', HelperService.errorCatch(async (request: express.Request, response: express.Response) => {
    let projectID: string = request.params.projectID;
    const tickets = await getTickets(projectID)
    response.status(400).json(tickets).send();
}))

tickets.post('projects/:id/tickets/addTicket', HelperService.errorCatch(async (request: express.Request, response: express.Response) => {
    let projectID: string = request.params.projectID;
    const { body } = request;
    addTicketToProject(projectID, body);
    response.status(400).send();
}))

tickets.post('projects/:id/tickets/removeTicket', HelperService.errorCatch(removeTicketFromProject));