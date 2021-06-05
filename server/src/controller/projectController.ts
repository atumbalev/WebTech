import { Request, Response } from 'express'
import ProjectService  from '../services/projectService';

export const getAllProjects = async (req: Request, res: Response) => {
    if (req.params) {
        await res.send(ProjectService.getProjectsByID(req.params.ID)).status(200);
        return;
    }
}

export const posNewProjects = (req: Request, res: Response) => { //post new project
    if (projects.find(el => el.name == req.body.name)) {
        res.status(400).send('This project name already exist.')
        return;
    }

    //add new
    var newProject: Project = {
        id: String(projects.length + 1),
        name: req.body.name,
        creatorID: req.params.ID,
        description: req.body.description,
        tickets: [],
        contributorIDs: req.body.contributor_ids
    }

    projects.push(newProject);
    res.status(200).send(newProject);
};

export const getAllTickets = (req: Request, res: Response) => {
    res.status(200).send(projects.find(el => el.id == req.params.projectID).tickets);
};

export const putNewTicket = (req: Request, res: Response) => {
    //validation
    const toUpdate = tickets.find(el => el.id == req.body.ticketID && el.id == req.params.projectID);

    if (!toUpdate) {
        res.status(400).send('Invalid ticket modification.');
        return;
    }

    //  update
    const ticket: Ticket = {
        id: toUpdate.id,
        taskName: req.body.taskName == null ? toUpdate.taskName : req.body.taskName,
        description: req.body.description == null ? toUpdate.description : req.body.description,
        category: req.body.category == null ? toUpdate.category : req.body.category,
        status: req.body.status == null ? toUpdate.status : req.body.status,
        assigneeID: req.body.assignee_id == null ? toUpdate.assigneeID : req.body.assignee_id,
        contributorIDs: req.body.contributor_ids == null ? toUpdate.contributorIDs : req.body.contributor_ids
    }

    const idx = tickets.indexOf(toUpdate);
    tickets.splice(idx, 1, ticket);

    res.status(200).send(ticket);
};

export const deleteAllTickets = (req: Request, res: Response) => {
    //validation
    let curProj: Project = projects.find(el => el.id == req.params.projectID);
    projects.find(el => el == curProj).tickets = [];

    if (!curProj) {
        res.status(400).send('Invalid projectID. Tickets are not deleted.');
        return;
    }

    let tiketIds: String[];
    curProj.tickets.forEach(el => tiketIds.push(el.id));

    for (var t in tickets) {
        if (tiketIds.find(el => el == tickets[t].id))
            tickets.splice(parseInt(t), 1);
    }

    res.status(200).send(new String('All tickets in project with id: ' + req.params.projectID + ' are deleted.'));
};

export const getAllContributers = (req: Request, res: Response) => {
    //   validation
    if (!projects.find(el => el.id == req.params.projectID)) {
        res.status(400).send('Invalid projectID.');
        return;
    }

    let contib_ids: String[] = projects.find(el => el.id == req.params.projectID).contributorIDs;
    let result: UserInfo[] = [];
    contib_ids.forEach(t_id => result.push(usersInfo.find(el => el.id == t_id)));
    res.status(200).send(result);
};

export const deleteContributer = (req: Request, res: Response) => {
    let toDelContribID = req.body.toDelID;
    let userID = req.body.userID;

    let curProject: Project = projects.find(el => el.id == req.params.projectID);

    if (userID != curProject.creatorID &&
        userID != toDelContribID) {
        res.status(400).send("Only owner of the project and the user himselft can delete contributer.");
        return;
    }

    if (curProject.creatorID == toDelContribID) {
        curProject.creatorID = null; //? delete the whole project?
        res.status(200).send("Owner of the project with id: " + req.params.projectID + "was deleted.");
        return;
    }

    let toDel = curProject.contributorIDs.find(el => el == toDelContribID);

    if (!toDel) {
        res.status(400).send('Invalid contributerID');
        return;
    }

    curProject.contributorIDs.splice(curProject.contributorIDs.indexOf(toDel), 1);

    res.status(200).send(toDel);
};