import * as express from 'express';
import errorCatch from '../helpers/errorHandler'
import {getUsers, postUser, deleteUser, putUser} from '../controller/userCountroller'

const router: express.Router = express.Router();

router.get('/', errorCatch(getUsers));

router.post('/',errorCatch(postUser));

router.delete('/:id', errorCatch(deleteUser));

router.put('/:id', errorCatch(putUser));

export default router;







//=================TRENDO==========================
// users.post('/:id', errorCatch(async (request: express.Request, response: express.Response) => {
//     const ourUser: any = request.body;

//     const userId: any = uuidv4();

//     const userWithId: any = {...ourUser, id: userId};

//     let usersInformation: string = await read(filePath, fileName);
//     const usersUsedHere: {[key: string]: Array<UsersAbout>} = JSON.parse(usersInformation);

//     usersUsedHere.users.push(userWithId);

//     usersInformation = JSON.stringify(usersUsedHere);

//     await write(filePath, fileName, usersInformation);

//     response.json(usersInformation);
// }));

// /*users.get('', (request: express.Request, response: express.Response) => {
//     console.log("fjfk");
//     response.send('Hi hi');
// })*/

// users.get('/', errorCatch(async (request: express.Request, response: express.Response) => {
//     const { id } = request.params;

//     let usersInformation: string = await read(filePath, fileName); 
//     const usersUsedHere: {[key: string]: Array<UsersAbout>} = JSON.parse(usersInformation);

//     const foundedUser: UsersAbout = await usersUsedHere.users.find((user) => {user.name == id});

//     response.status(200).json(foundedUser);
//     response.send('Hello');
// }));

// users.delete('/:id', errorCatch(async (request: express.Request, response: express.Response) => {
//     const { id } = request.params;

//     let usersInformation: string = await read(filePath, fileName);
//     const usersUsedHere: {[key: string]: Array<UsersAbout>} = JSON.parse(usersInformation);

//     const deletedUser: Array<UsersAbout> = await usersUsedHere.users.filter((user) => {user.name !== id});

//     usersUsedHere.users = deletedUser;
//     usersInformation = JSON.stringify(usersUsedHere);

//     await write(filePath, fileName, usersInformation);

//     response.status(200).json(usersInformation);
// }));

// users.put('/:id', errorCatch(async (request: express.Request, response: express.Response) => {
//     const { id } = request.params;
//     const { name, phone, description, profile_picture } = express.request.body;

//     let usersInformation: string = await read(filePath, fileName);
//     const usersUsedHere: {[key: string]: Array<UsersAbout>} = JSON.parse(usersInformation);

//     const userId: UsersAbout = usersUsedHere.users.find((user) => {user.name === id});

//     if(name) userId.name = name;
//     if(phone) userId.phone = phone;
//     if(description) userId.description = description;

//     if(profile_picture) userId.profile_picture = profile_picture;
//     // if(profile_picture) userId['profice-picture'] = profile_picture;

//     usersUsedHere.users.push(userId);

//     usersInformation = JSON.stringify(usersUsedHere);

//     await write(filePath, fileName, usersInformation);

//     response.json(usersInformation);
// }));

// export default users;