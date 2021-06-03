import ITicket from "./ticket";
import IUser from "./user";

import { v4 as uuid } from 'uuid';

interface IProject {
    name: string,
    description: string,
    ticket_ids: string[],
    contributor_ids: string[]
}

export default IProject;