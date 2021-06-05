import * as express from 'express'
import {getTickets, addTicketToProject, removeTicketFromProject} from '../controller/ticketActionsController'
import errorCatch from '../helpers/errorHandler'

const tickets:  express.Router = express.Router();

tickets.get('projects/:id/tickets', errorCatch(async (request: express.Request, response: express.Response) => {
    let projectID: string = request.params.projectID;
    const tickets = await getTickets(projectID)
    response.status(400).json(tickets).send();
}))

tickets.post('projects/:id/tickets/addTicket', errorCatch(async (request: express.Request, response: express.Response) => {
    let projectID: string = request.params.projectID;
    const { body } = request;
    addTicketToProject(projectID, body);
    response.status(400).send();
}))

tickets.post('projects/:id/tickets/removeTicket', errorCatch(removeTicketFromProject));