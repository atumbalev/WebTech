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

    async deleteProject(name: string): Promise<Boolean> {
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
    ): Promise<void> {
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
        return new Promise(async (res, rej) => {
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

                await User.updateOne({ email: newProject.creator }, { $addToSet: { projects: newProject.name } }).exec();//needs to be fixed

                res(true);
            }).catch((err) => {
                console.log(`ProjectService: addProject: Error: ${err}`);
                rej("Project exists");
            });
        })
    }

    async getProjectByEmail(email: string) {
        return new Promise(async (res, rej) => {
            const projectArr = await User.findOne({ email: email }).select('projects').exec();
            const currentProject = projectArr.get('projects', null, { getters: false });
            if(currentProject){
                res(currentProject);
                return;
            }
            rej("No project found");
        });
    }

    async getAllContributors(name: string) {
        return new Promise(async (res, rej) => {
            const contrubitors = await Project.findOne({ name: name }).select('contrubitors').get('contrubitors').exec()
                .then(() => {
                    res(contrubitors);
                    return;
                })
                .catch((err: Error) => rej("No contrubitors found"))
        });

    }

    async getTickets(name: string) {
        return new Promise(async (res, rej) => {
            const tickets = await Project.findOne({ name: name }).select('tickets').get('tickets').exec()
                .then(() => {
                    res(tickets);
                    return;
                })
                .catch((err: Error) => rej("No tickets found"))
        });
    }


    async addContributer(name: string, email: string) {
        return new Promise(async (res, rej) => {

            Project.updateOne({ name: name }, { $addToSet: { contributers: email } }).exec()
                .then(() => {
                    res(email);
                })
                .catch((err: Error) => {
                    rej(err);
                });

        });
    }
}

export default new ProjectService();