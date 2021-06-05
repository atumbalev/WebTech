import { Request, Response } from 'express'
import IProject from '../models/project';
import Project from '../schemas/ProjectSchema'
import Ticket from '../schemas/TicketSchema'
import ProjectService from '../services/projectService';
import UserService from '../services/userService';
import TicketService from '../services/ticketService';

export const getAllProjects = async (req: Request, res: Response) => {
    const id = req.params.ID;
    if (id) {
        const projects: String[] = await (await UserService.getUser(req.params.ID)).projects;
        res.status(200).send(projects);
    }
    else {
        res.send(404).send();
    }
}

export const posNewProjects = async (req: Request, res: Response) => { //post new project
    const body: IProject = req.body;
    await ProjectService.addProject(body);
};

export const getAllTickets = async (req: Request, res: Response) => {
    const id = req.params.ID;
    if (id) {
        const project = await Project.findOne({ _id: id }).select('tickets').exec();
        if (project) {
            const tickets = project.get('tickets', null, { getters: false }); // -> tickets: []
            res.status(200).json({ "tickets": tickets });
            return;
        }
        res.status(400).json("error: No tickets found");
    }
    else {
        res.send(404).json("error: No valid ID");
    }

    //Project.findOne(req.params.ID).populate(path: 'tickets');
};

export const putTicket = async (req: Request, res: Response) => {
    const idProject = req.params.ID;
    const projectName = req.body.projectName;
    const newTicket = new Ticket({
        taskName: req.body.taskName,
        description: req.body.description,
        category: req.body.category,
        status: req.body.status,
        assignor: req.body.assignor,
        assignees: req.body.assignees
    });
    await TicketService.addTicket(projectName, newTicket).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(404).send(err);
    });

};

export const deleteAllTickets = async (req: Request, res: Response) => {
    const ID = req.params.ID;

    await Project.findOne({ _id: ID }).select('tickets').remove().exec().then(() =>{
        res.sendStatus(200);
        return;
    }).catch(err => {
        res.sendStatus(404).send(err);
    });
};

export const getAllContributers = async (req: Request, res: Response) => {
    const id = req.params.ID;
    if (id) {
        const project = await Project.findOne({ _id: id }).select('contrubitors').exec();
        if (project) {
            const tickets = project.get('contrubitors', null, { getters: false });
            res.status(200).json({ "contrubitors": tickets });
            return;
        }
        res.status(400).json("error: No contrubitors found");

    }
    else {
        res.send(404).json("error: No valid ID");
    }
};

export const deleteContributer = async (req: Request, res: Response) => {

    // let toDelContribID = req.body.toDelID;
    // let userID = req.body.userID;
    // const id = req.params.ID;

    // const curProject = await Project.findOne({ _id: id }).exec();

    // if (userID != curProject.get('contributor') &&
    //     userID != toDelContribID) {
    //     res.status(400).send("Only owner of the project and the user himselft can delete contributer.");
    //     return;
    // }

    // if (id) {
    //     const contributors = await Project.findOne({ _id: id }).select('contributors').exec();

    //     if (!contributors) {
    //         res.send(404).json("error: No contributors to delete");
    //         return;
    //     }
    // }
    // else {
    //     res.send(404).json("error: No valid ID");
    // }


    
    //================OLD=================
    // let toDelContribID = req.body.toDelID;
    // let userID = req.body.userID;

    // let curProject: Project = projects.find(el => el.id == req.params.projectID);

    // if (userID != curProject.creatorID &&
    //     userID != toDelContribID) {
    //     res.status(400).send("Only owner of the project and the user himselft can delete contributer.");
    //     return;
    // }

    // if (curProject.creatorID == toDelContribID) {
    //     curProject.creatorID = null; //? delete the whole project?
    //     res.status(200).send("Owner of the project with id: " + req.params.projectID + "was deleted.");
    //     return;
    // }

    // let toDel = curProject.contributorIDs.find(el => el == toDelContribID);

    // if (!toDel) {
    //     res.status(400).send('Invalid contributerID');
    //     return;
    // }

    // curProject.contributorIDs.splice(curProject.contributorIDs.indexOf(toDel), 1);

    // res.status(200).send(toDel);
};