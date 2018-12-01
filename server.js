const express = require('express');
const routes = require('./routes/routes');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true}));

app.listen(port);


// app.use('/', express.static('public/build'));


app.use('/streamers', routes);
