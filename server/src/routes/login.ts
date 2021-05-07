/*import * as express from 'express';
import {read, write} from '../utils/file-utils';
import {LoginInfo} from '../interfaces/loginInfo';

const loginForm: express.Router = express.Router();

const filePath: string = '../resources';
const fileName: string = '/pseudo_database.json';

loginForm.post('/api/login', async (request: express.Request, response: express.Response) => {
    const ourLoginForm: any = request.body;

    let privateInfo = await read(filePath, fileName);
    const informationToParse: {[key: string]: Array<LoginInfo>} = JSON.parse(privateInfo);

    informationToParse.login.push(ourLoginForm);

    privateInfo = JSON.stringify(informationToParse);

    await write(filePath, fileName, privateInfo);

    response.json(privateInfo);
})*/

import { Router, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import auth from '../middleware/auth';
import validateUserForLogin from '../middleware/validateUserForLogin';
import errorCatch from '../middleware/error_handler'

const login: Router = Router();

login.post('/login', validateUserForLogin, auth, errorCatch((request: Request, response: Response) => {
    const { email, rememberMe } = request.body;

    const sessionData: any = request;
    sessionData.user = email;

    if(rememberMe) {
        bcrypt.hash(email, 10, (error: Error, hash: string) => {
            response.cookie('remember', hash, {path: '/', maxAge: 9000, httpOnly: false});
            response.set('Set-Cookie', `remeber=${hash}`);
        });
    }
    response.status(200).json({success: true});
}));

export default login;


  

