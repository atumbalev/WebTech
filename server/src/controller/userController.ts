import { Request, Response } from 'express';
import UserService from '../services/userService';
import User from '../schemas/UserSchema';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';


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
    UserService.login(body.email, body.password)
        .then(() => {
            const token = jwt.sign(
                { email: body.email },
                process.env.SALT_ROUNDS,
                // bcrypt.hash(process.env.TOKEN_SECRET,process.env.SALT_ROUNDS),
                { expiresIn: '5h' }
            );

            response.setHeader('Authorization', token);
            response.status(200).json({ "token": token });
        }).catch((err: Error) => {
            response.status(401).json({ "error": err });
        });
};

export const logout = async (req: Express.Request, res: Express.Response) => {
    localStorage.clear();
    // res.json({ logout: true });
    
};


// // logout
// const {
//     SESSION_SECRET = 'please keep this secret',
//     SESSION_NAME = 'sid'
// } = process.env;

// const logoutFunc = async (request: Request, response: Response) => {
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
