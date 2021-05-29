import express from 'express'
import routes from './routes/projectRoutes.js'
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json())
app.use('/projects', routes);
app.use(routes);

//SERVER 
const PORT = 8080;
app.listen(PORT, () =>console.log ('Issue tracker listening at http://localhost:%s',PORT))

