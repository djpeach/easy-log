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
```js
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
```js
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

![basic_use_case](https://user-images.githubusercontent.com/31779571/46962930-5f636a00-d072-11e8-8387-f3ab7281cfe2.png)

## Color Codes

Below is a table of supported color codes for you to choose from when configuring colors

<table>
    <tr>
        <td>1</td><td><img src="http://medyk.org/colors/800000.png" width="20" height="20" /></td>
        <td>4</td><td><img src="http://medyk.org/colors/000080.png" width="20" height="20" /></td>
        <td>6</td><td><img src="http://medyk.org/colors/008080.png" width="20" height="20" /></td>
        <td>9</td><td><img src="http://medyk.org/colors/ff0000.png" width="20" height="20" /></td>
        <td>10</td><td><img src="http://medyk.org/colors/00ff00.png" width="20" height="20" /></td>
        <td>11</td><td><img src="http://medyk.org/colors/ffff00.png" width="20" height="20" /></td>
        <td>46</td><td><img src="http://medyk.org/colors/00ff00.png" width="20" height="20" /></td>
        <td>51</td><td><img src="http://medyk.org/colors/00ffff.png" width="20" height="20" /></td>
        <td>75</td><td><img src="http://medyk.org/colors/5fafff.png" width="20" height="20" /></td>
        <td>81</td><td><img src="http://medyk.org/colors/5fd7ff.png" width="20" height="20" /></td>
    </tr>
    <tr>
        <td>123</td><td><img src="http://medyk.org/colors/87ffff.png" width="20" height="20" /></td>
        <td>154</td><td><img src="http://medyk.org/colors/afff00.png" width="20" height="20" /></td>
        <td>166</td><td><img src="http://medyk.org/colors/d75f00.png" width="20" height="20" /></td>
        <td>189</td><td><img src="http://medyk.org/colors/d7d7ff.png" width="20" height="20" /></td>
        <td>190</td><td><img src="http://medyk.org/colors/d7ff00.png" width="20" height="20" /></td>
        <td>194</td><td><img src="http://medyk.org/colors/d7ffd7.png" width="20" height="20" /></td>
        <td>195</td><td><img src="http://medyk.org/colors/d7ffff.png" width="20" height="20" /></td>
        <td>196</td><td><img src="http://medyk.org/colors/ff0000.png" width="20" height="20" /></td>
        <td>197</td><td><img src="http://medyk.org/colors/ff005f.png" width="20" height="20" /></td>
        <td>198</td><td><img src="http://medyk.org/colors/ff0087.png" width="20" height="20" /></td>
    </tr>
    <tr>
        <td>199</td><td><img src="http://medyk.org/colors/ff00af.png" width="20" height="20" /></td>
        <td>202</td><td><img src="http://medyk.org/colors/ff5f00.png" width="20" height="20" /></td>
        <td>204</td><td><img src="http://medyk.org/colors/ff5f87.png" width="20" height="20" /></td>
        <td>207</td><td><img src="http://medyk.org/colors/ff5fff.png" width="20" height="20" /></td>
        <td>208</td><td><img src="http://medyk.org/colors/ff8700.png" width="20" height="20" /></td>
        <td>213</td><td><img src="http://medyk.org/colors/ff87ff.png" width="20" height="20" /></td>
        <td>214</td><td><img src="http://medyk.org/colors/ffaf00.png" width="20" height="20" /></td>
        <td>220</td><td><img src="http://medyk.org/colors/ffd700.png" width="20" height="20" /></td>
        <td>225</td><td><img src="http://medyk.org/colors/ffd7ff.png" width="20" height="20" /></td>
        <td>226</td><td><img src="http://medyk.org/colors/ffff00.png" width="20" height="20" /></td>
    </tr>
  
</table>