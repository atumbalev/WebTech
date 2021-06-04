import { Request, Response } from 'express'

let tickets = [
    { id: 1, projectID: 1, assigneeID: "1", ticketName: 'A', category: '', status: 'In progress', priority: 'high', description: '', notes: '' },
    { id: 2, projectID: 4, assigneeID: "1", ticketName: 'B', category: '', status: 'In progress', priority: 'high', description: '', notes: '' },
    { id: 3, projectID: 2, assigneeID: "1", ticketName: 'C', category: '', status: 'In progress', priority: 'high', description: '', notes: '' },
]

export const deleteById = (req: Request, res: Response) => {
    const { id } = req.params;
    tickets = tickets.filter((element) => element.id !== parseInt(id));
    res.status(200).send(`Ticket with ${id} deleted`);
}

export const updateByID = (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        ticketName,
        description,
        category,
        status,
        assigneeID,
        // participants -- worksOnTable update?
    } = req.body;
    const ticketToBeUpdated = tickets.find((element) => element.id === parseInt(id));
    if (ticketName) ticketToBeUpdated.ticketName = ticketName;
    if (description) ticketToBeUpdated.description = description;
    if (category) ticketToBeUpdated.category = category;
    if (status) ticketToBeUpdated.status = status;
    if (assigneeID) ticketToBeUpdated.assigneeID = assigneeID;
    // if (participants) ticketToBeUpdated.participants = participants;

    res.status(200).send(`User with the id ${id} updated`);
}
