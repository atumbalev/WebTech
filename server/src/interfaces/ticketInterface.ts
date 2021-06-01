interface ITicket {
    id: string,
    taskName: string,
    description: string,
    category: string,
    status: string,
    assigneeID: string,
    contributorIDs: string[]
}

export default ITicket;