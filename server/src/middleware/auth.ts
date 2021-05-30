import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import LoginController from '../controllers/user-controller';
import { LoginInfo } from '../interfaces/loginInfo';

const controller: LoginController = new LoginController();

const auth = (request: Request, response: Response, next: () => void): void => {
    const { email, password } = request.body;

    controller.findUser(email)
       .then((user: LoginInfo[]) => {
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

/*const isLoggedIn = (request: any) => !!request.session!.userId;

export const checkLoggedIn = (request: Request, response: Response, next: NextFunction) => {
    if(isLoggedIn(request)) {
        return next(new Error('You must be logged in.'));
    }
    next();
}*/

export default auth;