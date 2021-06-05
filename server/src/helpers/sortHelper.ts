import * as ticketsController from '../controller/ticketsController';
import IProject from '../models/projectInterface'
import  ITicket  from '../models/ticketInterface'
import Project from '../schemas/ProjectSchema'

export const sortByAssignee = (tickets:ITicket[]) => {
    // class newTicket{
    //     taskname: String;
    //     description: String;
    //     assignee_id: String;
    //     status: String;
    //     category: String; 
        
    //     constructor(TaskName: string, Desscription: string, Assignee: string, Status: string, Category: string ){
    //         this.taskname = TaskName;
    //         this.description= Desscription;
    //         this.assignee_id= Assignee;
    //         this.status = Status
    //         this.category = Category;
    //     }
    // }
    // const newTickets: Array<newTicket> = [];
    // tickets.forEach(function (element){
    //     newTickets.push(new newTicket(
    //         element.taskName,
    //         element.description,
    //         element.assignee_id,
    //         element.status,
    //         element.category
    //     )
    //     )})
    // return newTickets;
    return Project.find().populate({path:'tickets', select: ['taskName', 'description', 'assigneeID', 'status', 'category']}).exec();
};

export const sortByStatus = (tickets:ITicket[], status:string) => {
    // const tempArray = tickets.filter((element) => element.status === status);
    // class newTicket{
    //     taskname: String;
    //     description: String;
    //     category: String;   
        
    //     constructor(TaskName: string, Desscription: string, Category: string ){
    //         this.taskname = TaskName;
    //         this.description= Desscription;
    //         this.category = Category;
    //     }
    // }
    // const newTickets: Array<newTicket> = [];
    // tempArray.forEach(function (element){
    //     newTickets.push(new newTicket(
    //         element.taskName,
    //         element.description,
    //         element.category
    //     ))});
    // return newTickets;
    return Project.find({status: status}).populate({path:'tickets', select: ['taskName', 'description', 'assigneeID', 'status', 'category']}).exec();
};