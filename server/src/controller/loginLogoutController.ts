import { Request, Response } from 'express';
import ILoginInfo from '../models/loginInfo';
import UserService from '../services/userService';
import LoginController from '../services/loginService';


//login
export const login = async (request: Request, response: Response) => {
    // const { email, rememberMe } = request.body;

    // const sessionData: any = request;
    // sessionData.user = email;

    // if (rememberMe) {
    //     bcrypt.hash(email, 10, (error: Error, hash: string) => {
    //         response.cookie('remember', hash, { path: '/', maxAge: 9000, httpOnly: false });
    //         response.set('Set-Cookie', `remeber=${hash}`);
    //     });
    // }
    // response.status(200).json({ success: true });
    const body: ILoginInfo = request.body;
    await UserService.login(body.email, body.password).then( () => {
        response.sendStatus(200).send;
    }).catch((error) => {
        response.sendStatus(401);
      });
}

// logout
const {
    SESSION_SECRET = 'please keep this secret',
    SESSION_NAME = 'sid'
} = process.env;

const logoutFunc = async (request: any /*Request*/, response: Response) => {
    new Promise<void>((resolve, reject: any) => {
        request.session!.destroy((err: Error) => {
            if (err) reject(err);
            response.clearCookie(SESSION_NAME);
            resolve();
        })
    })
}

export const logout = async (request: Request, response: Response) =>{
    await logoutFunc(request, response);
    response.status(200).json({message: 'OK'});
}


let controller: LoginController;

export const register = async (req: Request, res: Response) => {
    const userExist = await controller.findUser(req.body.email);

    if (userExist) {
        res.status(400).json({ success: false, error: 'Email is already taken' });
    } else {
        controller.createUser(req.body);
    
        res.status(200).json({success: true});
    }
}