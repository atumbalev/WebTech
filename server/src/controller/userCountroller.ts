import { Request, Response } from 'express'
import * as express from 'express';
import {v4 as uuidv4} from 'uuid';
uuidv4();

import {read, write} from '../utils/fileUtils';
import IUser from '../models/users';

const filePath: string = '../resources';
const fileName: string = '/pseudo_database.json';

export const getUsers = async function(request:Request, response:Response){
    const { id } = request.params;

    let usersInformation: string = await read(filePath, fileName); 
    const usersUsedHere: {[key: string]: Array<IUser>} = JSON.parse(usersInformation);

    const foundedUser: IUser = await usersUsedHere.users.find((user) => {user.name == id});

    response.status(200).json(foundedUser);
}

export const postUser = async function(request:Request, response:Response){
        const ourUser: any = request.body;
    
        const userId: any = uuidv4();
    
        const userWithId: any = {...ourUser, id: userId};
    
        let usersInformation: string = await read(filePath, fileName);
        const usersUsedHere: {[key: string]: Array<IUser>} = JSON.parse(usersInformation);
    
        usersUsedHere.users.push(userWithId);
    
        usersInformation = JSON.stringify(usersUsedHere);
    
        await write(filePath, fileName, usersInformation);
    
        response.status(200).json(usersInformation);
}

export const deleteUser = async function(request:Request, response:Response){
    const { id } = request.params;

    let usersInformation: string = await read(filePath, fileName);
    const usersUsedHere: {[key: string]: Array<IUser>} = JSON.parse(usersInformation);

    const deletedUser: Array<IUser> = await usersUsedHere.users.filter((user) => {user.name !== id});

    usersUsedHere.users = deletedUser;
    usersInformation = JSON.stringify(usersUsedHere);

    await write(filePath, fileName, usersInformation);

    response.status(200).json(usersInformation);
}

export const putUser = async function(request:Request, response:Response){
    const { id } = request.params;
    const { name, phone, description, profile_picture } = express.request.body;

    let usersInformation: string = await read(filePath, fileName);
    const usersUsedHere: {[key: string]: Array<IUser>} = JSON.parse(usersInformation);

    const userId: IUser = usersUsedHere.users.find((user) => {user.name === id});

    if(name) userId.name = name;
    if(phone) userId.phone = phone;
    if(description) userId.description = description;

    if(profile_picture) userId.profilePicture = profile_picture;

    usersUsedHere.users.push(userId);

    usersInformation = JSON.stringify(usersUsedHere);

    await write(filePath, fileName, usersInformation);

    response.status(200).json(usersInformation);
}