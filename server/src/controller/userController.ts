import { Request, Response } from 'express';
import UserService from '../services/userService';


//register
export const register = async (req:Request, res:Response) => {
    console.log(`Register: ${req.body}`)
    const body = req.body;
    await UserService.addUser(body).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(404);
    });
}

//login
export const login = async (request: Request, response: Response) => {
    const body = request.body;

    await UserService.login(body.email, body.password).then( () => {
        response.sendStatus(200).send();
    }).catch((error) => {
        response.sendStatus(401);
      });
}

// // logout
// const {
//     SESSION_SECRET = 'please keep this secret',
//     SESSION_NAME = 'sid'
// } = process.env;

// const logoutFunc = async (request: any /*Request*/, response: Response) => {
//     new Promise<void>((resolve, reject: any) => {
//         request.session!.destroy((err: Error) => {
//             if (err) reject(err);
//             response.clearCookie(SESSION_NAME);
//             resolve();
//         })
//     })
// }

// export const logout = async (request: Request, response: Response) =>{
//     await logoutFunc(request, response).then(() => {
//         response.status(200).json({message: 'OK'});
//     }).catch(err => {
//         response.status(400).json(err);
//     });
   
// }


