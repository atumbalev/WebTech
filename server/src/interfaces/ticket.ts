import IUser from "./user";

interface ITicket {
    taskName: string,
    description: string,
    categoty: string,
    status: string,
    assignee_id: string
}

export default ITicket;