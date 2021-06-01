import { Request, Response } from 'express'
import Project from '../interfaces/projectInterface'
import Ticket from '../interfaces/ticketInterface'
import UserInfo from '../interfaces/usersAboutInterface'
import User from '../interfaces/loginInfoInterface'


let usersInfo: UserInfo[] = [
    { id: "1", name: "Ivan", email: "1.@...", phone: "07777", description: "", profilePicture: "", authToken: "gsdgsd" },
    { id: "2", name: "Gosho", email: "2..@...", phone: "08244", description: "", profilePicture: "", authToken: "fafs" },
    { id: "3", name: "Pesho", email: "3..@...", phone: "0725235", description: "", profilePicture: "", authToken: "gsdgs" }
]

let users: User[] = [
    { email: "1.@...", password: "fasfas" },
    { email: "2.@...", password: "fasfas" },
    { email: "3.@...", password: "fasfas" }
];

let projects: Project[] = [
    { id: "1", name: 'A', creatorID: "1", description: "Adesc", ticketIDs: ["1", "2", "3"], contributorIDs: ["1,2"] },
    { id: "2", name: 'B', creatorID: "2", description: "Bdesc", ticketIDs: ["1", "2",], contributorIDs: ["2,3"] },
    { id: "3", name: 'C', creatorID: "3", description: "Cdesc", ticketIDs: ["2", "3"], contributorIDs: ["1,2"] },
    { id: "4", name: 'D', creatorID: "4", description: "Ddesc", ticketIDs: ["1", "3"], contributorIDs: ["2,3"] },
]

let tickets: Ticket[] = [
    { id: "1", taskName: 'A', description: '', category: '', status: 'In progress', assigneeID: "1" ,contributorIDs: ["2"]},
    { id: "2", taskName: 'B', description: '', category: '', status: 'In progress', assigneeID: "2", contributorIDs: ["3"]},
    { id: "3", taskName: 'C', description: '', category: '', status: 'In progress', assigneeID: "3", contributorIDs: ["1","2"]}
]

export const getAllProjects = (req: Request, res: Response) => {
    res.status(200).send(
        projects.filter(el => el.contributorIDs.find(el => el == req.params.ID))
    );
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
        ticketIDs: req.body.ticket_ids,
        contributorIDs: req.body.contributor_ids
    }

    projects.push(newProject);
    res.status(200).send(newProject);
};

export const getAllTickets = (req: Request, res: Response) => {
    let tiket_ids: String[] = projects.find(el => el.id == req.params.projectID).ticketIDs;
    let result: Ticket[] = [];
    tiket_ids.forEach(t_id => result.push(tickets.find(el => el.id == t_id)));
    res.status(200).send(result);
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
    let curProj:Project = projects.find(el => el.id == req.params.projectID);
    projects.find(el => el == curProj).ticketIDs=[];

    if (!curProj) {
        res.status(400).send('Invalid projectID. Tickets are not deleted.');
        return;
    }

    let tiket_ids: String[] = curProj.ticketIDs;

    for (var t in tickets){
        if(tiket_ids.find(el => el == tickets[t].id))
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
    let toDelContribID =  req.body.toDelID;
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
