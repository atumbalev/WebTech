import { Request, Response } from 'express';
import UserService from '../services/userService';
import User from '../schemas/UserSchema';

//uodateInfo
export const updateInfo = async (req: Request, res: Response) => {
    await UserService.updateUserInfo(req.body.email, req.body.phone, req.body.name, req.body.description, req.body.profilePicture).then(() => {
        res.status(200).send("Successful update!");
    }).catch(err => {
        res.sendStatus(404);
    });
}

// getInfo
export const getInfo = async (req: Request, res: Response) => { //JSON!!
    const email = req.params.email;
    if (email) {
        const userInfo = await User.findOne({ email: email }).exec();
        if (userInfo) {
            res.status(200).send(userInfo);
            return;
        }
        res.status(400).json("error: No info found");
    }
    else {
        res.send(404).json("error: Invalid ID");
    }
}


//register
export const register = async (req: Request, res: Response) => {
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

    await UserService.login(body.email, body.password).then(() => {
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

//
