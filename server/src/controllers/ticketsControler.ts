import {read, write} from '../utils/files-utils'
import ITicket from '../interfaces/ticket';
import IUser from '../interfaces/login-info';
import IProject from '../interfaces/project';

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
    return project.ticket;
}

export  async function addTicketToProject(projectName: string, POSTBody: string): Promise<void> {
    const ticket: ITicket = JSON.parse(POSTBody);
    let project: IProject = await readProject(projectName);
    project.ticket.push(ticket);
    await writeProject(project);
}

export  async function removeTicketFromProject(POSTBody: string): Promise<void> {
    // {
    //     'projectName': "name",
    //     'ticketID': id
    // }
    const bodyObject: Object = JSON.parse(POSTBody);
    let project: IProject = await readProject(bodyObject['projectName']);
    const ticketToRemove: ITicket = project.ticket.find(t => t.id === bodyObject['ticketID'])
    const index: number = project.ticket.indexOf(ticketToRemove);
    if (index > -1) {
        project.ticket.splice(index, 1);
    } else {
        // No such element send response
    }
    await writeProject(project);
    // Send OK
}
