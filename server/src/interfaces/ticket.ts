import IUser from "./user";

interface ITicket {
    taskName: string,
    description: string,
    categoty: string,
    status: string,
    assignee: IUser,
}

export default ITicket;