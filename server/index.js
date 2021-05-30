import express from 'express';
import bodyParser from 'body-parser';
import ticketsRoutes from './routes/ticketsRouter.js'
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use('/tickets', ticketsRoutes);

app.get('/', (req, res) => res.send('Hello'));

app.listen(PORT, () => console.log(`ListeninG to port: http://localhost:${PORT}`));