import * as bcrypt from 'bcrypt';
// import * as _ from 'lodash';
import ILoginInfo from '../models/loginInfo';
import { read, write } from '../utils/fileUtils';

const filePath: string = '../resources';
const fileName: string = '/login_database.json';

class LoginController {
    private user: ILoginInfo;

    construct() {}

    public createUser(user: ILoginInfo): void {
        bcrypt.hash(user.password, 10, async (error: Error, hash: string) => {
            if(error) {
                return;
            }

            user.password = hash;

            const usersObject: { [users: string]: ILoginInfo[] } = await this.readUsers();
            usersObject.users.push(user);

            await write(filePath, fileName, JSON.stringify(usersObject));
    });
}

   public async findUser(emailUser: string): Promise<ILoginInfo[]> {
       const usersObject: { [users: string]: ILoginInfo[] } = await this.readUsers();

       return usersObject.users.filter((currUser: ILoginInfo) => currUser.email === emailUser);
   }

    private async readUsers(): Promise<{ [users: string]: ILoginInfo[] }> {
        const users: string = await read(filePath, fileName);
        const usersObject: { [users: string]: ILoginInfo[] } = JSON.parse(users);

        return usersObject;
    }

    public validateUser(user: ILoginInfo): string[] {
        const errors: string[] = [];

        if(!user.email) {
            errors.push('Please enter a valid email!');
        }
        
        if(!user.password) {
            errors.push('Please enter a password!');
        }
        else if(!user.password.match(/[a-zA-z0-9]?/)) {
            errors.push('Password must contain letters and digits!');
        }
        else if(user.password.length < 5) {
            errors.push('Password must be at least 8 symbols!');
        }

        return errors;
    }
}

export default LoginController;
