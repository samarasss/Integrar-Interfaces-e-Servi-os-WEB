const express = require("express");
const bodyParser = require('body-parser');
const tasksRoutes = require('./routes/routes.js');

const app = express();
app.use(bodyParser.json()); 
app.use('/api', tasksRoutes);

const port = 3000
app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`)
});



