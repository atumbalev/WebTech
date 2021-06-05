import * as mongoose from 'mongoose'
import IUsers from "../models/users"
import ITicket from "../models/ticket"
import IProject from '../models/project'
import User from '../schemas/UserSchema'

import Project from '../schemas/ProjectSchema'






export default class ProjectService {
    constructor() { }

    public async getProjectsByID(ID: string): Promise<IProject[]>  {
        return new Promise(async (res, rej) => {
            const user: IUsers = await User.findOne({_id:ID}).populate({path: 'projects', select: 'name'}).exec();  
            if(user.projects){
                res(user.projects)
            }
            rej("No projects to show");
        })
    };



    async get(ID: string){};

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
                res(true);
            }).catch((err) => {
                console.log(`ProjectService: addProject: Error: ${err}`);
                rej("Project exists");
            });
        })
    }

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




}