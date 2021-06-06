import * as express from 'express';
import { connect } from 'http2';
import models, { connectDB } from './db/dbConnetion';
const bp = require('body-parser')
// import Cors  from 'cors';


//routes
import loginLogoutRoutes from './routes/loginLogoutroutes'
import userRoutes from './routes/userRoutes';
import * as dotenv from 'dotenv'

// app.use(Cors({ origin: '*' })); //!!! don't remove me

dotenv.config();

const app = express();

//body parser
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


app.use('/', loginLogoutRoutes); //login & logout
app.use('/users', userRoutes); //users

app.use(express.json());

// parse application/x-www-form-urlencoded

// parse application/json

//server
const PORT = 3000;
//app.set("port",PORT);
//app.listen(PORT, () =>console.log ('Issue tracker listening at http://localhost:%s',PORT))

connectDB()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}!`);
    });
  })
  .catch((error: Error) => {
    console.log(error);
  });
  
//export default app;