import * as mongoose from 'mongoose'
import IUsers from "../models/users"
import User from '../schemas/UserSchema'
import * as bcrypt from 'bcrypt'

mongoose.set('useFindAndModify', false);

const SALT_ROUNDS = 10;

class UserService {
    contructor() { }

    async addUser(user: IUsers) {
        return new Promise(async (res, rej) => {
            const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
            this.notExists(user.email).then(async () => {
                const newUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    name: user.name,
                    email: user.email,
                    password: hashedPassword,
                    phone: user.phone,
                    description: user.description,
                    profilePicture: user.profilePicture,
                    authToken: user.authToken,
                    projects: []
                });
                await newUser.save();
                res(true);
            }).catch((err) => {
                console.log(`UserService: addUser: Error: ${err}`);
                rej("User exists");
            });
        })
    }

    private notExists = (email: string) => {
        return new Promise(async (res, rej) => {
            const user = await User.findOne({ email: email }).exec();
            if (user) {
                rej("User exists");
            }
            res(true);
        });
    };

    exists = (email: string) => {
        return new Promise(async (res, rej) => {
            const user = await User.findOne({ email: email }).exec();
            if (user) {
                res(true);
            }
            rej("User does not exists");
        })
    };

    async login(email: string, password: string): Promise<Boolean> {
        return new Promise((res, rej) => {
            this.exists(email).then(async () => {
                const user: IUsers = await User.findOne({ email: email }).select('password').exec();
                if (bcrypt.compare(password, user.password)) {
                    res(true);
                }
                rej("Invalid password");
            })
        })
    };

    // async getUser(ID: string) : Promise<IUsers> {
    //     return new Promise<IUsers>(async (res, rej) => {
    //         const user: IUsers = await User.findOne({ _id: ID }).exec().then();
    //         if (user) {
    //             res(user);
    //         }
    //         rej("User does not exists");
    //     })
    // };

    async deleteUser(ID: string): Promise<Boolean> {
        return new Promise(async (res, rej) => {
            const deletedUser = await User.deleteOne({ _id: ID }).exec();
            if (deletedUser) {
                res(true);
            }
            rej("Un successfully deleted");
        })
    };

    async updateUser (
        id: mongoose.Types.ObjectId,
        email: string,
        password: string,
        phone?: string,
        name?: string,
        description?: string,
        profilePicture?: BinaryType,
        projects?: string[]
    ): Promise<void> {
        const user = await User.findOne({ _id: id }).exec().then(async (u: any) => {
            await User.findOneAndUpdate(
                { _id: id },
                {
                    name: name,
                    phone: phone,
                    description: description,
                    profilePicture: profilePicture,
                    projects: projects
                }
            )
        })
    };


};

export default new UserService();