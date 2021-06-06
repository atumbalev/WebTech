import { Request, Response } from 'express'
import IProject from '../models/project';
import ITicket from '../models/ticket';

import Project from '../schemas/ProjectSchema'
import Ticket from '../schemas/TicketSchema'
import User from '../schemas/UserSchema'

import ProjectService from '../services/projectService';
import TicketService from '../services/ticketService';

export const getAllProjects = async (req: Request, res: Response) => {
    const email = req.params.email;
    console.log(email);
    if (email) {
        const user = await User.findOne({ email: email }).populate('projects').select('projects').exec();
        console.log(user);
        if (user) {
            const projects = user.get('projects', null, { getters: false });

            res.status(200).json({ "projects": projects });
            return;
        }
        res.status(400).json("error: No Project found");
    }
    else {
        res.send(404).send();
    }
}

export const postNewProject = async (req: Request, res: Response) => { //post new project
    const email = req.params.email;
    let body: IProject = req.body;
    //body.creator = email;
    await ProjectService.addProject(body).then(() => {
        res.send(200);
    }).catch(err => {
        res.send(404);
    })
};

export const getTicket = async (req: Request, res: Response) => {
    const name = req.params.name;
    if (name) {
        const project = await Project.findOne({ name: name }).select('tickets').exec();
        if (project) {
            const tickets = project.get('tickets', null, { getters: false });
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
    const ticketName = req.body.ticketName;
    if (TicketService.notExists(ticketName)){
        res.send(404).json("error: No valid ticketName");
        return;
    }
    // await TicketService.updateTicket(projectName, newTicket).then(() => {
    //     res.sendStatus(200);
    // }).catch(err => {
    //     res.sendStatus(404).send(err);
    // });

};

export const postTicket = async (req: Request, res: Response) => { //to test
    const email = req.params.email;
    const name=req.params.name;
    const newTicket = req.body;
   
    await TicketService.addTicket(name,newTicket).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(404).json("No ticket added");
    });
}

export const deleteTicket = async (req: Request, res: Response) => {
    const ID = req.params.ID;
    console.log(ID);
    //console.log(Project.findOne({ _id: ID }).exec());

    await Project.updateOne({_id: ID}, { $set: { tickets: [] }});

    //Project.updateOne( {_id: ID}, { $pullAll: {tickets: [] } } )
    //const update = {$pull {ID: {Project.findOne({ _id: ID }).populate('tickets')}}
    // await Project.findOne({ _id: ID }).populate('tickets').remove().exec().then(() => {
    //     console.log("inside rith");
    //     res.sendStatus(200);
    //     return;
    // }).catch(err => {
    //     console.log("bad");
    //     res.sendStatus(404).send(err);
    // });
};

export const getAllContributers = async (req: Request, res: Response) => {
    const name = req.params.name;
    if (name) {
        const project = await Project.findOne({ name: name }).select('contrubitors').exec();
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



// export const deleteContributer = async (req: Request, res: Response) => {
// 
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
// };