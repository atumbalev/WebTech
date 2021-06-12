import { Request, Response } from 'express'
import IProject from '../models/project';
import Project from '../schemas/ProjectSchema'
import User from '../schemas/UserSchema'
import ProjectService from '../services/projectService';
import TicketService from '../services/ticketService';

export const getAllProjects = async (req: Request, res: Response) => {
    const email = req.params.email;
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
        console.log("Not Found")
        res.send(404).send();
    }
}

export const postNewProject = async (req: Request, res: Response) => { 
    const email = req.params.email;
    let body: IProject = req.body;
    body.creator = email;
    await ProjectService.addProject(body).then(() => {
        res.status(200).json("Project added");
    }).catch(err => {
        res.sendStatus(404).json({"No project added. Error ": err});
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
};

export const putTicket = async (req: Request, res: Response) => {
    const name = req.params.name;
    const taskName = req.params.ticketName;
    const ticket = req.body;
      
    TicketService.updateTicket(name, taskName,ticket.description, ticket.category, ticket.status, ticket.assignees).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        res.status(404).send(err);
    });

};

export const postTicket = async (req: Request, res: Response) => { 
    const name = req.params.name;
    const newTicket = req.body;
   
    await TicketService.addTicket(name,newTicket).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(404).json("No ticket added");
    });
}

export const deleteTicket = async (req: Request, res: Response) => {
    const name = req.params.name;
    const ticketName = req.params.ticketName;

    await Project.updateOne({name: name}, {$pull: {tickets: {taskName:ticketName} }}).then(() => {
        res.sendStatus(200).json("Deleted!");
        return;
    }).catch(err =>{
        res.sendStatus(404).send("No ticket added");
    });
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
