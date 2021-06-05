import {read, write} from '../utils/fileUtils'
import ITicket from '../models/ticket';
import IProject from '../models/project';

import { Router, Request, Response } from 'express'

const filePath = '../resources/projects/';
const fileName = 'projects.json';

async function readTickets() : Promise<{ [projects: string] : ITicket[] }> {
    const tickets: string = await read(filePath, fileName);
    const ticketsObject: { [projects: string] : ITicket[] } = JSON.parse(tickets);
    return ticketsObject;
}

async function readProject(projectName: string) : Promise<IProject> {
    const project: string = await read(filePath, projectName + '.json');
    const projectObject: IProject = JSON.parse(project);
    return projectObject;
}

async function writeProject(project: IProject): Promise<void> {
    const projectData: string = JSON.stringify(project);
    await write(filePath, project.name + '.json', projectData);
}

export async function getTickets(projectName: string): Promise<ITicket[]> {
    const project: IProject = await readProject(projectName);
    return project.tickets;
}

export  async function addTicketToProject(projectName: string, POSTBody: string): Promise<void> {
    const ticket: ITicket = JSON.parse(POSTBody);
    let project: IProject = await readProject(projectName);
    project.tickets.push(ticket);
    await writeProject(project);
}

export  async function removeTicketFromProject(request: Request, response: Response): Promise<void> {
    // {
    //     'projectName': "name",
    //     'ticketID': id
    // }
    const {projectID, ticketID} = request.body;
    let project: IProject = await readProject(projectID);
    const ticketToRemove: ITicket = project.tickets.find(t => t.id === ticketID)
    const index: number = project.tickets.indexOf(ticketToRemove);
    if (index > -1) {
        project.tickets.splice(index, 1);
    } else {
        response.status(400).send('No such ticket')
    }
    await writeProject(project);
    response.status(200).send(`removed ticket with ID ${ticketID} from project with ID ${projectID}`)
}
