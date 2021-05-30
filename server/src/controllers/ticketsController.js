import { v4 as uuidv4 } from 'uuid';
let tickets = [];

export const deleteById = (req, res) => {
    const { id } = req.params;
    ticktes = tickets.filter((element) => element.id !== id);
    res.send(`Ticket with ${id} deleted`);
}

export const updateByID = (req, res) => {
        const { id } = req.params;
        const {
            taskName,
            description,
            categoty,
            status,
            assignee,
            participants
        } = req.body;
        const ticketToBeUpdated = tickets.find((element) => element.id === id);
        if (taskName) ticketToBeUpdated.taskName = taskName;
        if (description) ticketToBeUpdated.description = description;
        if (categoty) ticketToBeUpdated.categoty = categoty;
        if (status) ticketToBeUpdated.status = status;
        if (assignee) ticketToBeUpdated.assignee = assignee;
        if (participants) ticketToBeUpdated.participants = participants;

        res.send(`User with the id ${id} updated`);
    }
    /*
    export const addTicket = (req, res) => {
        const ticket = req.body;
        tickets.push({
            ticket,
            id: uuidv4()
        });
        res.send(`Ticket with the id ${id} send!`)
    }*/