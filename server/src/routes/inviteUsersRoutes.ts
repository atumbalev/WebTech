import * as express from 'express'
import addUserToProject from '../controller/invitationController'

const users:  express.Router = express.Router();

users.post('/users/invitation', addUserToProject)