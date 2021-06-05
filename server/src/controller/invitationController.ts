import {read, write} from '../utils/fileUtils'
import IUser from '../models/users'
import IProject from '../models/project';
import { Router, Request, Response } from 'express'
import * as mongoose from 'mongoose'
import Project from '../schemas/ProjectSchema'
import { userInfo } from 'os';


export default async function addUserToProject(request: Request, response: Response): Promise<void> {
    const { user, projectName}: any = request.body;

    const update = { $push: {contrubitorsIDs: user} }
    const currentProject = await Project.findOne({name: projectName}).select('contributorIDs').exec();
    if (currentProject) {
        const users = currentProject.get('contributerIDs', null, {getters: false});
    }
}
