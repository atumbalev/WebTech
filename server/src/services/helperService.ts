import {Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import LoginController from '../services/loginService';
import ILoginInfo from '../models/loginInfo';

const controller: LoginController = new LoginController();

class HelperService {
    constructor() { }

    auth = (request: Request, response: Response, next: () => void): void => {
        const { email, password } = request.body;

        controller.findUser(email)
            .then((user: ILoginInfo[]) => {
                if (user && user.length === 1) {
                    bcrypt.compare(password, user[0].password, (error: Error, result: Boolean) => {
                        if (error) {
                            response.status(400).json({ error });
                        }

                        if (result) {
                            next();
                        }
                        else {
                            response.status(401).json({ error: 'Unauthorized' });
                        }
                    });
                }
            });
    }

    errorCatch = (middlewareId: (req: Request, res: Response, next?:any) => void) => {
        const handleError = async (req: Request, res: Response, next:any) => {
            try {
                await middlewareId(req, res, next);
            } catch(error) {
                res.status(200).json(error);
            }
        };
        return handleError;
    };

    validateUserForLogin = (request: Request, response: Response, next: () => void): void => {
        const user: ILoginInfo = request.body;
    
        const isValidUserForLogin: string[] = controller.validateUser(user);
    
        if(isValidUserForLogin) {
            response.status(200).json({error: isValidUserForLogin});
        }
        else {
            next();
        }
    }
}

export default new HelperService();