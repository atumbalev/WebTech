export const sortByAssignee = (tickets) => {
    const newTickets = [];
    console.log(tickets.taskName);
    tickets.forEach(element => {
        newTickets.push({
            taskName: element.taskName,
            description: element.description,
            assignee: element.assignee,
            status: element.status,
            categoty: element.categoty
        })
        console.log(newTickets);
    });
    return newTickets;
};

export const sortByStatus = (tickets, status) => {
    console.log(status)
    const tempArray = tickets.filter((element) => element.status === status.status);
    const newTickets = [];
    tempArray.forEach(element => {
        newTickets.push({
            taskName: element.taskName,
            description: element.description,
            categoty: element.categoty
        })
    });
    return newTickets;
};