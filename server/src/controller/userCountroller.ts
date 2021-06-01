import { Request, Response } from 'express'
import * as express from 'express';
import {v4 as uuidv4} from 'uuid';
uuidv4();

import {read, write} from '../utils/fileUtils';
import IUsersAbout from '../interfaces/usersAboutInterface';

const filePath: string = '../resources';
const fileName: string = '/pseudo_database.json';

export const getUsers = async function(request:Request, response:Response){
    const { id } = request.params;

    let usersInformation: string = await read(filePath, fileName); 
    const usersUsedHere: {[key: string]: Array<IUsersAbout>} = JSON.parse(usersInformation);

    const foundedUser: IUsersAbout = await usersUsedHere.users.find((user) => {user.name == id});

    response.status(200).json(foundedUser);
    response.send('Hello');
}

export const postUser = async function(request:Request, response:Response){
        const ourUser: any = request.body;
    
        const userId: any = uuidv4();
    
        const userWithId: any = {...ourUser, id: userId};
    
        let usersInformation: string = await read(filePath, fileName);
        const usersUsedHere: {[key: string]: Array<IUsersAbout>} = JSON.parse(usersInformation);
    
        usersUsedHere.users.push(userWithId);
    
        usersInformation = JSON.stringify(usersUsedHere);
    
        await write(filePath, fileName, usersInformation);
    
        response.status(200).json(usersInformation);
}

export const deleteUser = async function(request:Request, response:Response){
    const { id } = request.params;

    let usersInformation: string = await read(filePath, fileName);
    const usersUsedHere: {[key: string]: Array<IUsersAbout>} = JSON.parse(usersInformation);

    const deletedUser: Array<IUsersAbout> = await usersUsedHere.users.filter((user) => {user.name !== id});

    usersUsedHere.users = deletedUser;
    usersInformation = JSON.stringify(usersUsedHere);

    await write(filePath, fileName, usersInformation);

    response.status(200).json(usersInformation);
}

export const putUser = async function(request:Request, response:Response){
    const { id } = request.params;
    const { name, phone, description, profile_picture } = express.request.body;

    let usersInformation: string = await read(filePath, fileName);
    const usersUsedHere: {[key: string]: Array<IUsersAbout>} = JSON.parse(usersInformation);

    const userId: IUsersAbout = usersUsedHere.users.find((user) => {user.name === id});

    if(name) userId.name = name;
    if(phone) userId.phone = phone;
    if(description) userId.description = description;

    if(profile_picture) userId.profile_picture = profile_picture;

    usersUsedHere.users.push(userId);

    usersInformation = JSON.stringify(usersUsedHere);

    await write(filePath, fileName, usersInformation);

    response.status(200).json(usersInformation);
}