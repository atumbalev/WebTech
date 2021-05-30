import { Request, Response } from 'express'

let worksOnTable = [ //cascade update/add/delete
    { id: 1, projectID: 1, contirbuterID: 1, contributerEmail: 'email1', ticketID: 1 },
    { id: 4, projectID: 2, contirbuterID: 1, contributerEmail: 'email1', ticketID: 1 },
    { id: 2, projectID: 1, contirbuterID: 2, contributerEmail: 'email2', ticketID: 2 },
    { id: 3, projectID: 2, contirbuterID: 3, contributerEmail: 'email3', ticketID: 3 },
]

let users = [
    { id: 1, name: "Ivan", password: "", profilePic: "" },
    { id: 2, name: "Gosho", password: "", profilePic: "" },
    { id: 2, name: "Pesho", password: "", profilePic: "" }
]

let projects = [
    { projectID: 1, projectName: 'A', creator: "ID1", about: 'Aabout' },
    { projectID: 2, projectName: 'B', creator: 'IDBcreator2', about: 'Babout' },
    { projectID: 3, projectName: 'C', creator: 'IDcreator3', about: 'Cabout' },
    { projectID: 4, projectName: 'D', creator: 'IDcreator4', about: 'Dabout' },
]

let tickets = [
    { id: 1, projectID: 1, ticketName: 'A', category: '', status: 'In progress', priority: 'high', description: '', notes: '' },
    { id: 2, projectID: 4, ticketName: 'B', category: '', status: 'In progress', priority: 'high', description: '', notes: '' },
    { id: 3, projectID: 2, ticketName: 'C', category: '', status: 'In progress', priority: 'high', description: '', notes: '' },

]

export const getAllProjects = (req: Request, res: Response) => {
    let worksOnProjects = worksOnTable.filter(el => el.contirbuterID == parseInt(req.params.ID));
    let result = [];
    for (var y of worksOnProjects)
        for (var x of projects) {
            if (x.projectID == y.projectID)
                result.push(x);
        }
    res.status(200);
    res.send(result);
}

export const posNewProjects = (req: Request, res: Response) => { //post new projects
    if (projects.find(el => el.projectName == req.body.projectName)) {
        res.status(400).send('This project name already exist.')
        return;
    }

    //add new
    var newProject = {
        "projectID": projects.length + 1,
        "projectName": req.body.projectName,
        "creator": req.params.id, //valid user
        "about": req.body.about
    }

    projects.push(newProject);
    res.status(200).send(newProject);
};

export const getAllTickets = (req: Request, res: Response) => {
    let allTickets = worksOnTable.filter(el => el.projectID == parseInt(req.params.projectID));
    res.status(200).send(allTickets);
};

export const putNewTicket = (req: Request, res: Response) => {
    //TO DO:
    const categories = {}
    const priorities = {}
    const statuses = {}
    //enums -> for validation

    //validation
    const toUpdate = tickets.find(el => el.id == req.body.ticketID && el.projectID == parseInt(req.params.projectID));
    if (!toUpdate) {
        res.status(400).send('Invalid ticket modification.');
        return;
    }

    //  update
    const ticket = {
        "id": tickets.length+1,
        "projectID": parseInt(req.params.projectID),
        "ticketName": req.body.ticketName,
        "category": req.body.category,
        "status": req.body.status,
        "priority": req.body.priority,
        "description": req.body.description,
        "notes": req.body.description
    }

    const idx = tickets.indexOf(toUpdate);
    tickets.splice(idx, 1, ticket);

    res.status(200).send(ticket);
};

export const deleteAllTickets = (req: Request, res: Response) => {
    //validation
    if (!projects.find(el => el.projectID == parseInt(req.params.projectID))) {
        res.status(400).send('Invalid projectID. Tickets are not deleted.');
        return;
    }

    for (var t in tickets) {
        if (tickets[t].projectID == parseInt(req.params.projectID))
            tickets.splice(parseInt(t), 1);
    }

    res.status(200).send(new String('All tickets in project with id: ' + req.params.projectID + ' are deleted.'));
};

export const getAllContributers = (req: Request, res: Response) => {
    //   validation
    if (!projects.find(el => el.projectID == parseInt(req.params.projectID))) {
        res.status(400).send('Invalid projectID.');
        return;
    }

    let allProjects = worksOnTable.filter(el => el.projectID == parseInt(req.params.projectID));

    let contributors = []; //names only
    for (var x of allProjects)
        contributors.push(users.find(el => el.id == x.contirbuterID));
    res.send(contributors);
};

export const deleteContributer = (req: Request, res: Response) => {
    let toDelContribID = req.body.toDelID;
    let userID = req.body.userID;

    let prjCreator = projects.find(el => el.projectID == parseInt(req.params.projectID));

    if (userID != prjCreator.creator &&
        userID != toDelContribID) {
        res.status(400).send("Only owner of the project and the user himselft can delete contributer.");
        return;
    }

    if (prjCreator.creator == toDelContribID) {
        prjCreator.creator = "";
        res.status(200).send("Owner of the project with id: " + req.params.projectID + "was deleted.");
        return;
    }

    let toDel = worksOnTable.filter(el => el.contirbuterID == toDelContribID);

    if (!toDel) {
        res.status(400).send('Invalid contributerID');
        return;
    }

    for (var x of toDel) {//if tasks are in the same table
        worksOnTable.splice(worksOnTable.indexOf(x), 1);
    }

    res.status(200).send(toDel);
};
