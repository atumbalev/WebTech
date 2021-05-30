import ITicket from "./ticket";
import IUser from "./user";

import { uuid } from 'uuidv4';

interface IProject {
    name: string,
    description: string,
    tickets: ITicket[],
    contributors: string[]
}

export default IProject;