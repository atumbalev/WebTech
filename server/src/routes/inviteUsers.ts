import * as express from 'express'
import addUserToProject from '../controllers/invitationControler'
import errorCatch from '../middleware/error-handler'

const users:  express.Router = express.Router();

users.post('/users/invitation', errorCatch(async (request: express.Request, response: express.Response) => {
    const { body } = request;
    addUserToProject(body);

    // {
    //     "projectName": 'Name',
    //     "userID": 'user1'
    // }
    
}))
