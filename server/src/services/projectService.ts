import * as mongoose from 'mongoose'
import ITicket from "../models/ticket"
import IProject from '../models/project'
import User from '../schemas/UserSchema'

import Project from '../schemas/ProjectSchema'


class ProjectService {
    constructor() { }

    private notExists = (name: string) => {
        return new Promise(async (res, rej) => {
            const project = await Project.findOne({ name: name }).exec();
            if (project) {
                rej("Project exists");
            }
            res(true);
        });
    };

    private exists = (name: string) => {
        return new Promise(async (res, rej) => {
            const project = await User.findOne({name: name}).exec();
            if(project){
                res(true);
            }
            rej("Project does not exists");
        })
    };

    // async getProject (ID: string){
    //     return new Promise(async (res, rej) => {
    //         const project = await Project.findOne({ _id: ID }).exec();
    //         if (project) {
    //             res(project);
    //         }
    //         rej("Project does not exists");
    //     })
    // };

    async deleteProject(name: string): Promise<Boolean>{
        return new Promise(async (res, rej) => {
            const deletedProject = await Project.deleteOne({ name: name }).exec();
            if (deletedProject) {
                res(true);
            }
            rej("Project successfully deleted");
        })
    };

    async updateProject(
        id: mongoose.Types.ObjectId,
        name: string,
        creator: string,
        description: string,
        tickets: ITicket[],
        contrubitors: String[]
    ): Promise<void>{
        const project = await Project.findOne({ _id: id }).exec().then(async (u: any) => {
            await User.findOneAndUpdate(
                { _id: id },
                {
                    name: name,
                    creator: creator,
                    description: description,
                    tickets: tickets,
                    contrubitors: contrubitors
                }
            )
        })
    };

    async addProject(project: IProject) {
        return new Promise((res, rej) => {
            this.notExists(project.name).then(async () => {
                const newProject = new Project({
                    _id: new mongoose.Types.ObjectId(),
                    name: project.name,
                    creator: project.creator,
                    description: project.description,
                    tickets: project.tickets,
                    contributors: project.contributors
                });

                await newProject.save();

                User.updateOne({_id: project.creator}, {$push: {projects: newProject}}).exec();

                res(true);
            }).catch((err) => {
                console.log(`ProjectService: addProject: Error: ${err}`);
                rej("Project exists");
            });
        })
    }


}

export default new ProjectService();