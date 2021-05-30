import * as express from 'express';
import users from '../src/routes/user';
import loginForm from '../src/routes/login'

const app = express();

app.use(express.json());
app.use('/api', users);
app.use('/api', loginForm);

app.listen(3001, () => {
    console.log("Server is listening on port 3001.");
});