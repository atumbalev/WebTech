import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import LoginController from '../controller/loginControllerClass';
import ILoginInfo from '../models/loginInfo';

const controller: LoginController = new LoginController();

const auth = (request: Request, response: Response, next: () => void): void => {
    const { email, password } = request.body;

    controller.findUser(email)
       .then((user: ILoginInfo[]) => {
           if(user && user.length === 1) {
               bcrypt.compare(password, user[0].password, (error: Error, result: Boolean) => {
                   if(error) {
                       response.status(400).json({error});
                   }

                   if(result) {
                       next();
                   }
                   else {
                       response.status(401).json({ error: 'Unauthorized' });
                   }
               });
           }
       });
}

export default auth;