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
        <td>20</td><td style="backgroundColor: red";></td>
        <td>21</td><td style="backgroundColor: yellow";></td>
        <td>26</td><td style="backgroundColor: green";></td>
        <td>27</td><td style="backgroundColor: ";></td>
        <td>32</td><td style="backgroundColor: ";></td>
        <td>33</td><td style="backgroundColor: ";></td>
        <td>38</td><td style="backgroundColor: ";></td>
    </tr>
    <tr>
        <td>39</td><td style="backgroundColor: ";></td>
        <td>40</td><td style="backgroundColor: ";></td>
        <td>41</td><td style="backgroundColor: ";></td>
        <td>42</td><td style="backgroundColor: ";></td>
        <td>43</td><td style="backgroundColor: ";></td>
        <td>44</td><td style="backgroundColor: ";></td>
        <td>45</td><td style="backgroundColor: ";></td>
    </tr>
    <tr>
        <td>56</td><td style="backgroundColor: ";></td>
        <td>57</td><td style="backgroundColor: ";></td>
        <td>62</td><td style="backgroundColor: ";></td>
        <td>63</td><td style="backgroundColor: ";></td>
        <td>68</td><td style="backgroundColor: ";></td>
        <td>69</td><td style="backgroundColor: ";></td>
        <td>74</td><td style="backgroundColor: ";></td>
    </tr>
    <tr>
        <td>75</td><td style="backgroundColor: ";></td>
        <td>76</td><td style="backgroundColor: ";></td>
        <td>77</td><td style="backgroundColor: ";></td>
        <td>78</td><td style="backgroundColor: ";></td>
        <td>79</td><td style="backgroundColor: ";></td>
        <td>80</td><td style="backgroundColor: ";></td>
        <td>81</td><td style="backgroundColor: ";></td>
    </tr>
    <tr>
        <td>92</td><td style="backgroundColor: ";></td>
        <td>93</td><td style="backgroundColor: ";></td>
        <td>98</td><td style="backgroundColor: ";></td>
        <td>99</td><td style="backgroundColor: ";></td>
        <td>112</td><td style="backgroundColor: ";></td>
        <td>113</td><td style="backgroundColor: ";></td>
        <td>128</td><td style="backgroundColor: ";></td>
    </tr>
    <tr>
        <td>129</td><td style="backgroundColor: ";></td>
        <td>134</td><td style="backgroundColor: ";></td>
        <td>135</td><td style="backgroundColor: ";></td>
        <td>148</td><td style="backgroundColor: ";></td>
        <td>149</td><td style="backgroundColor: ";></td>
        <td>160</td><td style="backgroundColor: ";></td>
        <td>161</td><td style="backgroundColor: ";></td>
    </tr>
    <tr>
        <td>162</td><td style="backgroundColor: ";></td>
        <td>163</td><td style="backgroundColor: ";></td>
        <td>164</td><td style="backgroundColor: ";></td>
        <td>165</td><td style="backgroundColor: ";></td>
        <td>166</td><td style="backgroundColor: ";></td>
        <td>167</td><td style="backgroundColor: ";></td>
        <td>168</td><td style="backgroundColor: ";></td>
    </tr>
    <tr>
        <td>169</td><td style="backgroundColor: ";></td>
        <td>170</td><td style="backgroundColor: ";></td>
        <td>171</td><td style="backgroundColor: ";></td>
        <td>172</td><td style="backgroundColor: ";></td>
        <td>173</td><td style="backgroundColor: ";></td>
        <td>178</td><td style="backgroundColor: ";></td>
        <td>179</td><td style="backgroundColor: ";></td>
    </tr>
    <tr>
        <td>184</td><td style="backgroundColor: ";></td>
        <td>226</td><td style="backgroundColor: ";></td>
        <td>185</td><td style="backgroundColor: ";></td>
        <td>196</td><td style="backgroundColor: ";></td>
        <td>197</td><td style="backgroundColor: ";></td>
        <td>198</td><td style="backgroundColor: ";></td>
        <td>199</td><td style="backgroundColor: ";></td>
    </tr>
    <tr>
        <td>200</td><td style="backgroundColor: ";></td>
        <td>201</td><td style="backgroundColor: ";></td>
        <td>202</td><td style="backgroundColor: ";></td>
        <td>203</td><td style="backgroundColor: ";></td>
        <td>204</td><td style="backgroundColor: ";></td>
        <td>205</td><td style="backgroundColor: ";></td>
        <td>206</td><td style="backgroundColor: ";></td>
    </tr>
    <tr>
        <td>207</td><td style="backgroundColor: ";></td>
        <td>208</td><td style="backgroundColor: ";></td>
        <td>209</td><td style="backgroundColor: ";></td>
        <td>214</td><td style="backgroundColor: ";></td>
        <td>215</td><td style="backgroundColor: ";></td>
        <td>220</td><td style="backgroundColor: ";></td>
        <td>221</td><td style="backgroundColor: ";></td>
</table>