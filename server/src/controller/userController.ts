import { Request, Response } from 'express';
import UserService from '../services/userService';
import User from '../schemas/UserSchema';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';


//uodateInfo
export const updateInfo = async (req: Request, res: Response) => {
    await UserService.updateUserInfo(req.body.email, req.body.phone, req.body.name, req.body.description, req.body.profilePicture)
    .then(() => {
        res.status(200).send("Successful update!");
        return;
    }).catch((err : Error) => {
        res.status(304).json({"error": err});
        return;
    });
}

// getInfo
export const getInfo = async (req: Request, res: Response) => {
    if(req.params.email === 'undefined' || req.params.email === null){
        res.status(400).send("Invalid email");
        return;
    }
   const userInfo = await UserService.getUserInfo(req.params.email)
    .then(() => {
        res.status(200).json({"userInfo": userInfo});
        return;
    }).catch((err : Error) => {
        res.status(400).json({"error": err});
        return;
    });
}


//register
export const register = async (req: Request, res: Response) => {
    const body = req.body;
    if(body === 'undefined' || body === null){
        res.status(406).send("Invalid input");
        return;
    }

    await UserService.register(body.email,body.password).then(() => {
        res.sendStatus(200);
        return;
    }).catch((err : Error) => {
        res.status(406).json({"error": err});
        return;
    });
}

//login
export const login = async (req: Request, res: Response) => {
    const body = req.body;
    //body check
    if(body === 'undefined' || body === null){
        res.status(406).send("Invalid email or pasword");
        return;
    }
    UserService.login(body.email, body.password)
        .then(() => {
            const token = jwt.sign(
                { email: body.email },
                process.env.TOKEN_SECRET,
                { expiresIn: '5h' }
            );

            res.setHeader('Authorization', token);
            res.status(200).json({ "token": token });
            return;
        }).catch((err: Error) => {
            res.status(401).json({ "error": err });
            return;
        });
};

export const logout = async (req: Request, res: Response) => {//need to be tested and thought
    localStorage.clear();
    res.status(200).send("Logout success!");
    return;
};
