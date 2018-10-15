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
        <td>20</td><td><img src="___" width="30" height="30" /></td>
        <td>21</td><td><img src="___" width="30" height="30" /></td>
        <td>26</td><td><img src="___" width="30" height="30" /></td>
        <td>27</td><td><img src="___" width="30" height="30" /></td>
        <td>32</td><td><img src="___" width="30" height="30" /></td>
        <td>33</td><td><img src="___" width="30" height="30" /></td>
        <td>38</td><td><img src="___" width="30" height="30" /></td>
    </tr>
    <tr>
        <td>39</td><td><img src="___" width="30" height="30" /></td>
        <td>40</td><td><img src="___" width="30" height="30" /></td>
        <td>41</td><td><img src="___" width="30" height="30" /></td>
        <td>42</td><td><img src="___" width="30" height="30" /></td>
        <td>43</td><td><img src="___" width="30" height="30" /></td>
        <td>44</td><td><img src="___" width="30" height="30" /></td>
        <td>45</td><td><img src="___" width="30" height="30" /></td>
    </tr>
    <tr>
        <td>56</td><td><img src="___" width="30" height="30" /></td>
        <td>57</td><td><img src="___" width="30" height="30" /></td>
        <td>62</td><td><img src="___" width="30" height="30" /></td>
        <td>63</td><td><img src="___" width="30" height="30" /></td>
        <td>68</td><td><img src="___" width="30" height="30" /></td>
        <td>69</td><td><img src="___" width="30" height="30" /></td>
        <td>74</td><td><img src="___" width="30" height="30" /></td>
    </tr>
    <tr>
        <td>75</td><td><img src="___" width="30" height="30" /></td>
        <td>76</td><td><img src="___" width="30" height="30" /></td>
        <td>77</td><td><img src="___" width="30" height="30" /></td>
        <td>78</td><td><img src="___" width="30" height="30" /></td>
        <td>79</td><td><img src="___" width="30" height="30" /></td>
        <td>80</td><td><img src="___" width="30" height="30" /></td>
        <td>81</td><td><img src="___" width="30" height="30" /></td>
    </tr>
    <tr>
        <td>92</td><td><img src="___" width="30" height="30" /></td>
        <td>93</td><td><img src="___" width="30" height="30" /></td>
        <td>98</td><td><img src="___" width="30" height="30" /></td>
        <td>99</td><td><img src="___" width="30" height="30" /></td>
        <td>112</td><td><img src="___" width="30" height="30" /></td>
        <td>113</td><td><img src="___" width="30" height="30" /></td>
        <td>128</td><td><img src="___" width="30" height="30" /></td>
    </tr>
    <tr>
        <td>129</td><td><img src="___" width="30" height="30" /></td>
        <td>134</td><td><img src="___" width="30" height="30" /></td>
        <td>135</td><td><img src="___" width="30" height="30" /></td>
        <td>148</td><td><img src="___" width="30" height="30" /></td>
        <td>149</td><td><img src="___" width="30" height="30" /></td>
        <td>160</td><td><img src="___" width="30" height="30" /></td>
        <td>161</td><td><img src="___" width="30" height="30" /></td>
    </tr>
    <tr>
        <td>162</td><td><img src="___" width="30" height="30" /></td>
        <td>163</td><td><img src="___" width="30" height="30" /></td>
        <td>164</td><td><img src="___" width="30" height="30" /></td>
        <td>165</td><td><img src="___" width="30" height="30" /></td>
        <td>166</td><td><img src="___" width="30" height="30" /></td>
        <td>167</td><td><img src="___" width="30" height="30" /></td>
        <td>168</td><td><img src="___" width="30" height="30" /></td>
    </tr>
    <tr>
        <td>169</td><td><img src="___" width="30" height="30" /></td>
        <td>170</td><td><img src="___" width="30" height="30" /></td>
        <td>171</td><td><img src="___" width="30" height="30" /></td>
        <td>172</td><td><img src="___" width="30" height="30" /></td>
        <td>173</td><td><img src="___" width="30" height="30" /></td>
        <td>178</td><td><img src="___" width="30" height="30" /></td>
        <td>179</td><td><img src="___" width="30" height="30" /></td>
    </tr>
    <tr>
        <td>184</td><td><img src="___" width="30" height="30" /></td>
        <td>226</td><td><img src="___" width="30" height="30" /></td>
        <td>185</td><td><img src="___" width="30" height="30" /></td>
        <td>196</td><td><img src="___" width="30" height="30" /></td>
        <td>197</td><td><img src="___" width="30" height="30" /></td>
        <td>198</td><td><img src="___" width="30" height="30" /></td>
        <td>199</td><td><img src="___" width="30" height="30" /></td>
    </tr>
    <tr>
        <td>200</td><td><img src="___" width="30" height="30" /></td>
        <td>201</td><td><img src="___" width="30" height="30" /></td>
        <td>202</td><td><img src="___" width="30" height="30" /></td>
        <td>203</td><td><img src="___" width="30" height="30" /></td>
        <td>204</td><td><img src="___" width="30" height="30" /></td>
        <td>205</td><td><img src="___" width="30" height="30" /></td>
        <td>206</td><td><img src="___" width="30" height="30" /></td>
    </tr>
    <tr>
        <td>207</td><td><img src="___" width="30" height="30" /></td>
        <td>208</td><td><img src="___" width="30" height="30" /></td>
        <td>209</td><td><img src="___" width="30" height="30" /></td>
        <td>214</td><td><img src="___" width="30" height="30" /></td>
        <td>215</td><td><img src="___" width="30" height="30" /></td>
        <td>220</td><td><img src="___" width="30" height="30" /></td>
        <td>221</td><td><img src="___" width="30" height="30" /></td>
</table>