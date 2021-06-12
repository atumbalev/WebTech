import * as mongoose from 'mongoose'
import IUsers from "../models/users"
import User from '../schemas/UserSchema'
import * as bcrypt from 'bcrypt'
const fs = require('fs');

mongoose.set('useFindAndModify', false);

class UserService {
    contructor() { }

    async register(email: string, password: string) {
        return new Promise(async (res, rej) => {
            if (this.notExists(email)) {
                rej("User already exists");
                return;
            }
            const newUser: IUsers = new User({
                email: email,
                password: password
            })

            this.addUser(newUser).then(() => {
                res(true);
                return;
            }).catch((err) => {
                rej("User not added");
            });
        });
    }


    async addUser(user: IUsers) {
        return new Promise(async (res, rej) => {
            const hashedPassword = await bcrypt.hash(user.password, process.env.SALT_ROUNDS);
            this.notExists(user.email).then(async () => {
                const newUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    name: user.name,
                    email: user.email,
                    password: hashedPassword,
                    phone: user.phone,
                    description: user.description,
                    profilePicture: user.profilePicture,
                    //authToken: user.authToken,
                    projects: []
                });
                await newUser.save();
                res(true);
                return;
            }).catch((err) => {
                console.log(`UserService: addUser: Error: ${err}`);
                rej("User exists");
            });
        })
    }

    private notExists = (email: string) => {
        return new Promise(async (res, rej) => {
            const user = await User.findOne({ email: email }).exec().then(()=>{
                res(user);
                return;
            }).catch(()=>{
                rej("User exists");
            })
        });
    };

    exists = (email: string) => {
        return new Promise(async (res, rej) => {
            const user = await User.findOne({ email: email }).exec().then(()=>{
                res(true);
                return;
            }).catch(()=>{
                rej("User does not exists");
            })
        })
    };

    async login(email: string, password: string): Promise<IUsers> {
        return new Promise((res, rej) => {
            this.exists(email).then(async () => {
                const user: IUsers = await User.findOne({ email: email }).select('password').get('password').exec();
                
                const pass = await bcrypt.compare(password, user.password);
                if (pass) {
                    res(user);
                    return;
                }
                rej("Invalid password");
            })
            .catch(()=>{
                rej("Invalid user");
            })
        })
    };

    async updateUserInfo(
        email: string,
        phone?: string,
        name?: string,
        description?: string,
        profilePicture?: Buffer
    ) {
        return new Promise(async (res, rej) => {

            const profilePictureVar: any = {
                data: profilePicture ? fs.readFileSync(profilePicture) : fs.readFileSync('/client/src/source/profile.png'),
                contentType: 'image/png'
            }
           const user =  await User.findOneAndUpdate({ email: email }, {
                name: name,
                phone: phone,
                description: description,
                profilePicture: profilePictureVar
            }).exec()
                .then(() => {
                    res(user);
                    return;
                }
                ).catch((err: Error) => rej(err));
        });
    };


    async getUserInfo(email: string) {
        return new Promise(async (res, rej) => {
            const userInfo = await User.findOne({ email: email }).exec()
                .then(() => {
                    res(userInfo);
                    return;
                })
                .catch((err: Error) => rej(err))
        });

    };

};

export default new UserService();