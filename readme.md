# easy-log

A debugging module that grew out of a dissatisfaction of all other current modules for logging and debugging. Features all other dubugging features I could find, and some additional configurations, stack tracing, and options.

*Notice that this package is still not officially released, and is under heavy development. All releases should be stable, but are currently only tested on a Mac, use at your own risk, currently*

## Installation

```
npm i easy-log
```

## Usage

Using `const logger = require('easy-log')('app')` exposes a function that will name-space a logging function, which means the specified logger will only output when that name-space is specified, either in code or in the run script. Each logger is highly customizable, individually of each other. You can set, change, and toggle colors, formatting, stack tracing, and even the entire logger itself. Read on for specific syntax and example of how to do so.

## Base Example

A basic use case with a few different name-spaced loggers, and a couple different files

app.js
```
const express = require('express')
    , basicLog = require('../../')('app:basic')
    , dbLog = require('../../')('app:db')
    , mongoose = require('mongoose')

const app = express();
const name = "Example Application";

basicLog(`Booting ${name}`);

mongoose.connect("mongodb://localhost/example", { useNewUrlParser: true })
    .then(() => { dbLog(`app.js -> Mongod DB connected successfully`); })
    .catch((err) => { dbLog(`app.js -> Mongo DB could not connect: ${err}`); });

const port = process.env.PORT || 3000;

app.listen(port, () => { basicLog(`App listening on port ${port}`); });

// Use some imaginary worker file
require('./worker');
```

worker.js
```
const dbLogger = require('../../')('app:db')
    , basicLogger = require('../../')('app:basic');

function dbWork() {
    dbLogger('doing lots of uninteresting database work');
    setTimeout(dbWork, Math.random() * 1000);
}

dbWork();

function basicWork() {
    basicLogger('doing some basic work');
    setTimeout(basicWork, Math.random() * 2000);
}

basicWork();
```

run `DEBUG=app:* node app.js`

**Result**
***

![basic_use_case](https://user-images.githubusercontent.com/31779571/46962510-5756fa80-d071-11e8-8756-6c67f0aebb8d.png)