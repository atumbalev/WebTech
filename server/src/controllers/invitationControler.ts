import {read, write} from '../utils/files-utils'
import IUser from '../interfaces/user';
import IProject from '../interfaces/project';

const filePath = '../resources/';
const fileName = 'projects.json';

async function readProjects() : Promise<{ [projects: string] : IProject[] }> {
    const projects: string = await read(filePath, fileName);
    const projectsObjects: { [projects: string] : IProject[] } = JSON.parse(projects);
    return projectsObjects;
}

async function addUserToProjectAction(userName: string, projectName: string): Promise<void> {
    const projects:{ [projects: string] : IProject[] } = await readProjects();
    let targetProject = projects.projects.find(pr => pr.name == projectName);

    if (targetProject !== undefined)
    {
        targetProject.contributors.push(userName);
        await write(filePath, fileName, JSON.stringify(projects));
    }
}

export default async function addUserToProject(POSTBody: string): Promise<void> {
    const user: { [key: string]: string } = JSON.parse(POSTBody);
    addUserToProjectAction(user['user'], user['projectname']);
}
