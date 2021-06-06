import * as express from 'express';
import { connect } from 'http2';
// import Cors  from 'cors';
import models, { connectDB } from './db/dbConnetion';

//routes
import loginLogoutRoutes from './routes/loginLogoutroutes'
import userRoutes from './routes/userRoutes';

const app = express();

// app.use(Cors({ origin: '*' })); //!!! don't remove me

app.use('/api', loginLogoutRoutes); //login & logout
app.use('/users', userRoutes); //users

app.use(express.json());

// connectDB(); !!!

//server
const PORT = 8080;
app.set("port",PORT);
app.listen(PORT, () =>console.log ('Issue tracker listening at http://localhost:%s',PORT))

export default app;