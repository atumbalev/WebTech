import * as express from 'express'
import addUserToProject from '../controller/invitationController'
import errorCatch from '../helpers/errorHandler'

const users:  express.Router = express.Router();

users.post('/users/invitation', errorCatch(async (request: express.Request, response: express.Response) => {
    const { body } = request;
    addUserToProject(body);

    // {
    //     "projectName": 'Name',
    //     "userID": 'user1'
    // }
    
}))
