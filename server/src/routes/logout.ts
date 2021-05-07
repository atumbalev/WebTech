import { Router, Request, Response } from 'express';
import errorCatch from '../middleware/error_handler'
/*import ckeckLoggedIn from '../middleware/auth';*/

const logout: Router = Router();

const {
    SESSION_SECRET = 'please keep this secret',
    SESSION_NAME = 'sid'
} = process.env;

const logoutFunc = async (request: any /*Request*/, response: Response) => {
    new Promise<void>((resolve, reject: any) => {
        request.session!.destroy((err: Error) => {
            if(err) reject(err);
            response.clearCookie(SESSION_NAME);
            resolve();
        })
    })
}

logout.post('/logout', errorCatch(async (request: Request, response: Response) => {
   await logoutFunc(request, response);

   response.status(200).json({message: 'OK'});
}))