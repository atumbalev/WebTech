import * as express from 'express'
import {getTickets, addTicketToProject, removeTicketFromProject} from '../controllers/ticketsControler'
import errorCatch from '../middleware/error-handler'

const tickets:  express.Router = express.Router();

tickets.get('projects/:id/tickets', errorCatch(async (request: express.Request, response: express.Response) => {
    let projectID: string = request.params.projectID;
    const tickets = await getTickets(projectID)
    response.status(200).json(tickets).send();
}))

tickets.post('projects/:id/tickets/addTicket', errorCatch(async (request: express.Request, response: express.Response) => {
    let projectID: string = request.params.projectID;
    const { body } = request;
    addTicketToProject(projectID, body);
    response.status(200).send();
}))

tickets.post('projects/:id/tickets/removeTicket', errorCatch(async (request: express.Request, response: express.Response) => {
    let projectID: string = request.params.projectID;
    const { body } = request;
    removeTicketFromProject(body);
    response.status(200).send();
}))