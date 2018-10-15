const express = require('express')
    , basicLogger = require('../../')('app:basic')
    , dbLogger = require('../../')('app:db:test')
    , mongoose = require('mongoose');

const app = express();
const name = "Example Application";

basicLogger(`Booting ${name}`);

mongoose.connect("mongodb://localhost/example", { useNewUrlParser: true })
    .then(() => { dbLogger(`app.js -> Mongod DB connected successfully`); })
    .catch((err) => { dbLogger(`app.js -> Mongo DB could not connect: ${err}`); });

const port = process.env.PORT || 3000;

app.listen(port, () => { basicLogger(`App listening on port ${port}`); });

// Use some imaginary worker file
require('./worker');