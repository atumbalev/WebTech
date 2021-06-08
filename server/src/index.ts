import * as express from 'express';
import { connect } from 'http2';
import models, { connectDB } from './db/dbConnetion';
const bp = require('body-parser')
import * as cors  from 'cors';


//routes
import userRoutes from './routes/userRoutes';
import * as dotenv from 'dotenv'



dotenv.config();

const app = express();

app.use(cors({ origin: '*' })); //!!! don't remove me

//body parser
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


app.use('/', userRoutes); //login & logout

app.use(express.json());

// parse application/x-www-form-urlencoded

// parse application/json

//server

connectDB()
  .then(async () => {
    app.listen(process.env.PORT, () => {
      console.log('Issue tracker listening at http://localhost:%s!', process.env.PORT);
    });
  })
  .catch((error: Error) => {
    console.log(error);
  });
  