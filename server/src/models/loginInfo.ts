import {Document} from 'mongoose'

interface ILoginInfo extends Document {
    email: string,
    password: string
}
export default ILoginInfo;