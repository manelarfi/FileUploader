const express = require('express');
const app = express();
const errorHandler = require('./middlewares/errorHandler.js');
const db = require('./config/dbConnection.js');

db();
app.use(express.json())
app.use('/api/files', require('./routes/fileRoutes.js'));
app.use('/api', require('./routes/fileInfoRoutes.js'));
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("in port", port);
})