const express = require('express');
import routes from './src/routes/projectRoutes'

const app = express();

//routes
app.use('/projects', routes);
app.use(routes);

//server
const PORT = 8080;
app.set("port",PORT);
app.listen(PORT, () =>console.log ('Issue tracker listening at http://localhost:%s',PORT))

export default app;