import * as express from 'express';

//routes
import loginLogoutRoutes from './routes/loginLogoutroutes'
import userRoutes from './routes/userRoutes';

const app = express();

app.use('/api', loginLogoutRoutes); //login & logout
app.use('/users', userRoutes); //users

app.use(express.json());

//server
const PORT = 8080;
app.set("port",PORT);
app.listen(PORT, () =>console.log ('Issue tracker listening at http://localhost:%s',PORT))

export default app;