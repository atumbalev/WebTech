import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { LoginInfo } from '../interfaces/loginInfo';
import { read, write } from '../utils/file-utils';

const filePath: string = '../resources';
const fileName: string = '/login_database.json';

class LoginController {
    private user: LoginInfo;

    construct() {}

    public createUser(user: LoginInfo): void {
        bcrypt.hash(user.password, 10, async (error: Error, hash: string) => {
            if(error) {
                return;
            }

            user.password = hash;

            const usersObject: { [users: string]: LoginInfo[] } = await this.readUsers();
            usersObject.users.push(user);

            await write(filePath, fileName, JSON.stringify(usersObject));
    });
}

   public async findUser(emailUser: string): Promise<LoginInfo[]> {
       const usersObject: { [users: string]: LoginInfo[] } = await this.readUsers();

       return usersObject.users.filter((currUser: LoginInfo) => currUser.email === emailUser);
   }

    private async readUsers(): Promise<{ [users: string]: LoginInfo[] }> {
        const users: string = await read(filePath, fileName);
        const usersObject: { [users: string]: LoginInfo[] } = JSON.parse(users);

        return usersObject;
    }

    public validateUser(user: LoginInfo): string[] {
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
