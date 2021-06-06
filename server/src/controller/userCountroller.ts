import { Request, Response } from 'express'
import UserService from '../services/userService';
import User from '../schemas/UserSchema';
import IUser from '../models/users';

// export const getUsers = async function (request: Request, response: Response) { 
//         const users = await User.find();
//         if (users) {
//             response.status(200).json({ "users": users});
//             return;
//         }
//         response.status(400).json("error: No users found");
// }

export const getUser = async function (request: Request, response: Response) {
}

export const postUsers = async function (request: Request, response: Response) {
    const ourUser: IUser = request.body;
    await UserService.addUser(ourUser).then(() => {
        response.status(200);
        return;
    });
}

// export const deleteUser = async function (request: Request, response: Response) {
//     const { id } = request.params;

//     await UserService.deleteUser(id).then(() => {
//         response.sendStatus(200);
//     }).catch(err => {
//         response.sendStatus(404).send(err);
//     });
// }

export const updateUser = async function (request: Request, response: Response) {
    const body: IUser = request.body;
    
    if(body)
    {
        await UserService.updateUser(body.id, body.phone, body.name, body.description, body.profilePicture).then(() => {
            response.sendStatus(200);
            return;
        }).catch(error => {
            console.log(error);
            response.sendStatus(401);
        });
    }
}

