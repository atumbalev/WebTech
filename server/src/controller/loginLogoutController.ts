import { Router, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';


//login
export const login = (request: Request, response: Response) => {
    const { email, rememberMe } = request.body;

    const sessionData: any = request;
    sessionData.user = email;

    if (rememberMe) {
        bcrypt.hash(email, 10, (error: Error, hash: string) => {
            response.cookie('remember', hash, { path: '/', maxAge: 9000, httpOnly: false });
            response.set('Set-Cookie', `remeber=${hash}`);
        });
    }
    response.status(200).json({ success: true });
}

//logout
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