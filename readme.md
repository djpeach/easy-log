# easy-log

![basic_example](https://user-images.githubusercontent.com/31779571/46981232-77a0ac80-d0a5-11e8-99e5-3de868426683.png)

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

Example [app.js](https://github.com/djpeach/easy-log/blob/master/examples/basic%20use/app.js)

```js
const express = require('express')
    , basicLogger = require('easy-log')('app:basic', { colorCode: 199 })
    , dbLogger = require('easy-log')('app:db:', { colorCode: 226 })
    , mongoose = require('mongoose');

const app = express();
const name = "Example Application";

basicLogger(`Booting ${name}`);

mongoose.connect("mongodb://localhost/example", { useNewUrlParser: true })
    .then(() => { dbLogger(`Mongod DB connected successfully`); })
    .catch((err) => { dbLogger(`Mongo DB could not connect: ${err}`); });

const port = process.env.PORT || 3000;

app.listen(port, () => { basicLogger(`App listening on port ${port}`); });

// Use some imaginary worker file
require('./worker');
```

Example [worker.js](https://github.com/djpeach/easy-log/blob/master/examples/basic%20use/worker.js)

```js
const dbLogger = require('easy-log')('app:db', { colorCode: 40 })
    , basicLogger = require('easy-log')('app:basic', { colorCode: 45 });

function dbWork() {
    dbLogger('doing lots of uninteresting database work');
    setTimeout(dbWork, Math.random() * 1000);
}

dbWork();

function basicWork() {
    basicLogger('doing some basic work:b');
    setTimeout(basicWork, Math.random() * 2000);
}

basicWork();
```

### run `DEBUG=app:* node app.js`

## Result

![basic_example](https://user-images.githubusercontent.com/31779571/46981232-77a0ac80-d0a5-11e8-99e5-3de868426683.png)

# Features

## Name Spaces

When you create a logger, simple pass it a namespace as well, and it will only output when that namespace is specified either in code or in the run script.

```js
const logger = require('easy-log'); // Will default to '' and will always work
const logger2 = require('easy-log')('debugging') // Now will only output when the 'debugging' namespace is enabled
```

Note that a logger without a namespace will always output, and in fact, cannot be turned off.

## Enabling/Disabling namespaces

When you want to enable or disable a namespace you currently have two options. 

### In code:

```js
logger.enable();
logger.disable();
```

### With run script

Enabling a namespace

```
DEBUG=debugging

// OR

DEBUG=debugging,other-namespace

// OR

DEBUG=debugging other-namespace
```

Notice the runs script can set the DEBUG environmental variable(s) with commas, or spaces.

Specifically Disabling a namespace
```
DEBUG=debugging,-other-namespace
```

The `-` tells the logger to disable. If you put `DEBUG=debugging,-debugging`, the last one gets run last and so the `debugging` namespace logger will not work. This works really well in conjunction with wildcards.

## Wildcards

Instead of enabling every namespace, or listing every one in the run script, you can use wildcards. Wildcards can only be added in the run scripts

```
DEBUG=* // Will run every namespace (including some global node ones you might not want)

DEBUG=app:* // Will run every namespace that is a child of `app` (`app:db`, `app:error`, etc)

DEBUG=app:*,-app:db // Will run every namespace that is a child of `app` EXCEPT `app:db`
```

## Stack Tracing

You may have noticed that each logger almost looks like a error stack trace. This is intentional and the default behaviour, although it can be overridden. This is to give the developer more information about the program and where each output log is coming from, allowing them to trace through the program with ease.

![stack_tracing](https://user-images.githubusercontent.com/31779571/46980917-1cba8580-d0a4-11e8-97e7-8b68457279e0.png)

## Formatting

You also may have noticed that every logger lines up, right aligned. This makes it easier to ready, and currently is the default and only behaviour, but if it is not suitable for your use case, please submit a feature request on github and I will make a way to configure it.

## Options (colors and stack tracing)

When a logger is created, you can also pass it a set of options that will change how the logger acts. Right now these can only be configures when the logger is created. Below is a list of current options and what they do.

```
const logger = require('easy-log')('app', { colorCode: 201, includeLineNumber: false });
```

<table>
    <tr>
        <td>colorCode</td><td>Integer (supported ones)</td><td>Specify a color for the logger</td><td>`{ colorCode: 201 }`</td><td>Calculated from namespace string</td>
    </tr>
    <tr>
        <td>includeFunction</td><td>Boolean</td><td>Whether to list the function where the logger was called</td><td>`{ includeFunction: false }`</td><td>`true`</td>
    </tr>
    <tr>
        <td>includeFile</td><td>Boolean</td><td>Whether to list the file where the logger was called</td><td>`{ includeFunction: false }`</td><td>`true`</td>
    </tr>
    <tr>
        <td>includeLineNumber</td><td>Boolean</td><td>Whether to list the line where the logger was called</td><td>`{ includeFunction: false }`</td><td>`true`</td>
    </tr>
</table>

**That's it! So far this is what I have. Beware, this is not yet tested on windows, linux, or browsers, and I may need to tweak things to make those all work. Once I do, I will realease the first 'real' version (1.0.0). Until then, it _should_ be stable, at least on Mac and in Node.js. 

If you have a feature suggestion PLEASE let me know so I can incorporate it as quickly as possible. You can do so on my github, by following the Collaborating Guidelines I have and using the `issue` template I created: [Ask for a new feature](https://github.com/djpeach/easy-log/blob/master/Contributing-Guide.md)

# Color Codes

Below is a table of supported color codes for you to choose from when configuring colors

<table>
    <tr>
        <td>20</td><td><img src="https://camo.githubusercontent.com/e83f059d0163cca7112b6fff07b68b75043cd8b2/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3030303064372e706e67" width="30" height="30" /></td>
        <td>21</td><td><img src="https://camo.githubusercontent.com/b5ceafca867536279228b7c2afa9b674abb5b8d5/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3030303066662e706e67" width="30" height="30" /></td>
        <td>26</td><td><img src="https://camo.githubusercontent.com/db756500f31eee9b8c98413d5e4090d72a8dd31d/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3030356664372e706e67" width="30" height="30" /></td>
        <td>27</td><td><img src="https://camo.githubusercontent.com/c3a86c905092f7dba715c2d0ddcb0c5931f01e4b/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3030356666662e706e67" width="30" height="30" /></td>
        <td>32</td><td><img src="https://camo.githubusercontent.com/78c60b1abb2bfadf67f24304aec70615d8eb718a/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3030383764372e706e67" width="30" height="30" /></td>
        <td>33</td><td><img src="https://camo.githubusercontent.com/11f2305cf2587a98e146586afa08b20624ef97de/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3030383766662e706e67" width="30" height="30" /></td>
        <td>38</td><td><img src="https://camo.githubusercontent.com/cc69c06fda8be6de688ca81d6f206e217276c9f5/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3030616664372e706e67" width="30" height="30" /></td>
    </tr>
    <tr>
        <td>39</td><td><img src="https://camo.githubusercontent.com/97d17a3ef363b45ef09c082f5accbffda4e12b3f/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3030616666662e706e67" width="30" height="30" /></td>
        <td>40</td><td><img src="https://camo.githubusercontent.com/023525552d089ac660529b3ca821df674f07514b/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3030643730302e706e67" width="30" height="30" /></td>
        <td>41</td><td><img src="https://camo.githubusercontent.com/a1ed58d261783735a97cad67a40af30a38718e21/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3030643735662e706e67" width="30" height="30" /></td>
        <td>42</td><td><img src="https://camo.githubusercontent.com/1f54f327cf2e6954598b3fb50ab80667a355a776/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3030643738372e706e67" width="30" height="30" /></td>
        <td>43</td><td><img src="https://camo.githubusercontent.com/45c73e3eed006cd185f6022e3e7788e4e4ba6628/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3030643761662e706e67" width="30" height="30" /></td>
        <td>44</td><td><img src="https://camo.githubusercontent.com/74a77f0679a3019a410b63c760076226978b19c1/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3030643764372e706e67" width="30" height="30" /></td>
        <td>45</td><td><img src="https://camo.githubusercontent.com/94c41346a57ac7f526f8793f5200dec4924b34b5/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3030643766662e706e67" width="30" height="30" /></td>
    </tr>
    <tr>
        <td>56</td><td><img src="https://camo.githubusercontent.com/b7edf6b18c40d021d6dab93acae60b288f449b2d/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3566303064372e706e67" width="30" height="30" /></td>
        <td>57</td><td><img src="https://camo.githubusercontent.com/788fb41e9f5e4f37d6613afd1a213c196892bb02/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3566303066662e706e67" width="30" height="30" /></td>
        <td>62</td><td><img src="https://camo.githubusercontent.com/5993273fa59e6912f645920fb246ecd53937175c/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3566356664372e706e67" width="30" height="30" /></td>
        <td>63</td><td><img src="https://camo.githubusercontent.com/0b13900c8ad92dffca2aee7ab50c4d08a69859b5/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3566356666662e706e67" width="30" height="30" /></td>
        <td>68</td><td><img src="https://camo.githubusercontent.com/65d97a40598c66a00739adaa92fe2951d54261fa/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3566383764372e706e67" width="30" height="30" /></td>
        <td>69</td><td><img src="https://camo.githubusercontent.com/710098bc34cad273d93bdc86077549880baf892d/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3566383766662e706e67" width="30" height="30" /></td>
        <td>74</td><td><img src="https://camo.githubusercontent.com/60c68a575a62e8cc588c125eabb836c2bd46947d/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3566616664372e706e67" width="30" height="30" /></td>
    </tr>
    <tr>
        <td>75</td><td><img src="https://camo.githubusercontent.com/75150ff347b609a3dfbcdcd907233b343f0d0826/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3566616666662e706e67" width="30" height="30" /></td>
        <td>76</td><td><img src="https://camo.githubusercontent.com/2c92e3322453534c2e6eeb78f6b20a3a6251676a/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3566643730302e706e67" width="30" height="30" /></td>
        <td>77</td><td><img src="https://camo.githubusercontent.com/daf240c7256d1ec95acd1eb970b923c1056227dc/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3566643735662e706e67" width="30" height="30" /></td>
        <td>78</td><td><img src="https://camo.githubusercontent.com/6a94c6fa3963fa9b0b2059944d1dff6c8722451d/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3566643738372e706e67" width="30" height="30" /></td>
        <td>79</td><td><img src="https://camo.githubusercontent.com/e864e64a0e4bf0aabd1151c94bc7db9ef833447c/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3566643761662e706e67" width="30" height="30" /></td>
        <td>80</td><td><img src="https://camo.githubusercontent.com/38d18dbd9b0801a11554abfa58ad40c133fdf7e6/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3566643764372e706e67" width="30" height="30" /></td>
        <td>81</td><td><img src="https://camo.githubusercontent.com/9b5283b2877b332fa7a7888affa81960b1ae01f8/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3566643766662e706e67" width="30" height="30" /></td>
    </tr>
    <tr>
        <td>92</td><td><img src="https://camo.githubusercontent.com/652a5d65f0a386f44456bb6a0368f40401a3a2f9/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3837303064372e706e67" width="30" height="30" /></td>
        <td>93</td><td><img src="https://camo.githubusercontent.com/c86afe6f2b14f977ed50c39c8a8090b079fb0244/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3837303066662e706e67" width="30" height="30" /></td>
        <td>98</td><td><img src="https://camo.githubusercontent.com/6e502018019fa76b1bbeefcf604e898b46ec6185/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3837356664372e706e67" width="30" height="30" /></td>
        <td>99</td><td><img src="https://camo.githubusercontent.com/04117fcebb8ce268405ef22cfea2dddec78445c2/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3837356666662e706e67" width="30" height="30" /></td>
        <td>112</td><td><img src="https://camo.githubusercontent.com/e58f4fea1d5c3cb552d012136b0a23a002713ad3/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3837643730302e706e67" width="30" height="30" /></td>
        <td>113</td><td><img src="https://camo.githubusercontent.com/ce588b551dcbc27c99d40cfa32b332876be2c9f8/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f3837643735662e706e67" width="30" height="30" /></td>
        <td>128</td><td><img src="https://camo.githubusercontent.com/773fbef691a640418e1714b76d4807624a18d907/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6166303064372e706e67" width="30" height="30" /></td>
    </tr>
    <tr>
        <td>129</td><td><img src="https://camo.githubusercontent.com/42f80ec9548bb84087aa4462fe65d07affa6a8e8/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6166303066662e706e67" width="30" height="30" /></td>
        <td>134</td><td><img src="https://camo.githubusercontent.com/3ec6b2db77c4218a5f535e7c98e83cd768cb2aa5/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6166356664372e706e67" width="30" height="30" /></td>
        <td>135</td><td><img src="https://camo.githubusercontent.com/9da9cc205848dbbcf5b10e61f57670c47a2e2452/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6166356666662e706e67" width="30" height="30" /></td>
        <td>148</td><td><img src="https://camo.githubusercontent.com/41b2462aca3fb160f2c5ed9846c79ea664031eff/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6166643730302e706e67" width="30" height="30" /></td>
        <td>149</td><td><img src="https://camo.githubusercontent.com/6da66370af85e271cb72eb1c0c2cb172f29e1c0b/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6166643735662e706e67" width="30" height="30" /></td>
        <td>160</td><td><img src="https://camo.githubusercontent.com/631955eb737f2799c14aeebe0d17296645960f2d/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6437303030302e706e67" width="30" height="30" /></td>
        <td>161</td><td><img src="https://camo.githubusercontent.com/fabb60a033d2ea2e762abacc5861f5ee88d13b0d/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6437303035662e706e67" width="30" height="30" /></td>
    </tr>
    <tr>
        <td>162</td><td><img src="https://camo.githubusercontent.com/c89609dc778a5d5e873c42002bbadb023044f171/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6437303038372e706e67" width="30" height="30" /></td>
        <td>163</td><td><img src="https://camo.githubusercontent.com/b4afbdc6f0c541c2755eec761d43afd228297baf/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6437303061662e706e67" width="30" height="30" /></td>
        <td>164</td><td><img src="https://camo.githubusercontent.com/25a60e37d510953950353b7aea656ae26abac116/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6437303064372e706e67" width="30" height="30" /></td>
        <td>165</td><td><img src="https://camo.githubusercontent.com/9690af5f2f95c1e52baacfad55ff828a5473eb5d/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6437303066662e706e67" width="30" height="30" /></td>
        <td>166</td><td><img src="https://camo.githubusercontent.com/4c1c34f1e180f24fa26646d65b29cc8436ff25fe/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6437356630302e706e67" width="30" height="30" /></td>
        <td>167</td><td><img src="https://camo.githubusercontent.com/f636767b7fab1204c7e4f79e2559873e27b72fd5/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6437356635662e706e67" width="30" height="30" /></td>
        <td>168</td><td><img src="https://camo.githubusercontent.com/0e07ae991a37cfc35b2aa99bc39a0de4a8391df2/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6437356638372e706e67" width="30" height="30" /></td>
    </tr>
    <tr>
        <td>169</td><td><img src="https://camo.githubusercontent.com/c393ae29ea310bedad071eaef27912b2b528bc42/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6437356661662e706e67" width="30" height="30" /></td>
        <td>170</td><td><img src="https://camo.githubusercontent.com/f4d4a8a4a19013f1dc3d6ffef9d8f06bd21c7088/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6437356664372e706e67" width="30" height="30" /></td>
        <td>171</td><td><img src="https://camo.githubusercontent.com/93d44080d4afcf4b51f170329360e10e3f004672/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6437356666662e706e67" width="30" height="30" /></td>
        <td>172</td><td><img src="https://camo.githubusercontent.com/5c4a717c0bcbbb591e20a31f01748889186f829a/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6437383730302e706e67" width="30" height="30" /></td>
        <td>173</td><td><img src="https://camo.githubusercontent.com/effb356e0c1d81b61becc4931a132d6a984c7f19/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6437383735662e706e67" width="30" height="30" /></td>
        <td>178</td><td><img src="https://camo.githubusercontent.com/f58d7cdd57f7d0bc01f79cf3b223ecc61dccd0d8/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6437616630302e706e67" width="30" height="30" /></td>
        <td>179</td><td><img src="https://camo.githubusercontent.com/53d7a13393e2e452e8793200c6fd3eb178b9d165/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6437616635662e706e67" width="30" height="30" /></td>
    </tr>
    <tr>
        <td>184</td><td><img src="https://camo.githubusercontent.com/d39b7b19db6d655e4e3aa672e8e7d93dc72864a2/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6437643730302e706e67" width="30" height="30" /></td>
        <td>226</td><td><img src="https://camo.githubusercontent.com/02ecf21067cee5070153211a13774ca0355300f2/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6666666630302e706e67" width="30" height="30" /></td>
        <td>185</td><td><img src="https://camo.githubusercontent.com/30152e68d8e9621928a873358988cbd7813fed11/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6437643735662e706e67" width="30" height="30" /></td>
        <td>196</td><td><img src="https://camo.githubusercontent.com/a680688c6a39a457be6d2556f210c15e590cfc47/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6666303030302e706e67" width="30" height="30" /></td>
        <td>197</td><td><img src="https://camo.githubusercontent.com/59691f80a3c91e087e8f75cc46f11d83e46fbd08/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6666303035662e706e67" width="30" height="30" /></td>
        <td>198</td><td><img src="https://camo.githubusercontent.com/a2e98c537f00e259f55e8a3e815434fb704cc9d1/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6666303038372e706e67" width="30" height="30" /></td>
        <td>199</td><td><img src="https://camo.githubusercontent.com/0847fac68fffc2aad501734fa82669e3b4e6dd8f/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6666303061662e706e67" width="30" height="30" /></td>
    </tr>
    <tr>
        <td>200</td><td><img src="https://camo.githubusercontent.com/551469d3b84bec524278644dbc6b93f7ef3559d7/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6666303064372e706e67" width="30" height="30" /></td>
        <td>201</td><td><img src="https://camo.githubusercontent.com/a9af13fa35a3e6d6096c2cbc24263461ca8623d8/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6666303066662e706e67" width="30" height="30" /></td>
        <td>202</td><td><img src="https://camo.githubusercontent.com/34ddbcc353fd4449d4b9e91af8903304a89cfefb/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6666356630302e706e67" width="30" height="30" /></td>
        <td>203</td><td><img src="https://camo.githubusercontent.com/b5bde34e7cc03edd6f6e6dac0514563ed10c71fd/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6666356635662e706e67" width="30" height="30" /></td>
        <td>204</td><td><img src="https://camo.githubusercontent.com/0ca740ac3045f6d89e1cef662128b999981a36e4/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6666356638372e706e67" width="30" height="30" /></td>
        <td>205</td><td><img src="https://camo.githubusercontent.com/3eafed6096d2d63a4401fcb6dd76b88591815941/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6666356661662e706e67" width="30" height="30" /></td>
        <td>206</td><td><img src="https://camo.githubusercontent.com/c8d4b10e77c4815da04017b082d7558b4838e00e/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6666356664372e706e67" width="30" height="30" /></td>
    </tr>
    <tr>
        <td>207</td><td><img src="https://camo.githubusercontent.com/29af39dcaf6e85439bdc9da71a989ecebdca00a9/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6666356666662e706e67" width="30" height="30" /></td>
        <td>208</td><td><img src="https://camo.githubusercontent.com/1b82d1f3248fa337e17c00821bc9ccd534cbe760/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6666383730302e706e67" width="30" height="30" /></td>
        <td>209</td><td><img src="https://camo.githubusercontent.com/7c309447e30d0e0b773423dfe233ed41f3e123b8/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6666383735662e706e67" width="30" height="30" /></td>
        <td>214</td><td><img src="https://camo.githubusercontent.com/690df9f0f04e0ad3d8b42f197f95ff2d69e4aa22/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6666616630302e706e67" width="30" height="30" /></td>
        <td>215</td><td><img src="https://camo.githubusercontent.com/9853bb74a697bb39b2dc2ae6f271bf7c1d72e762/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6666616635662e706e67" width="30" height="30" /></td>
        <td>220</td><td><img src="https://camo.githubusercontent.com/2e1608e815c46d7851f70349e23c1c755454cafb/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6666643730302e706e67" width="30" height="30" /></td>
        <td>221</td><td><img src="https://camo.githubusercontent.com/a0ce1b9f525ecb22d940268848c04f0b0cabefe0/687474703a2f2f6d6564796b2e6f72672f636f6c6f72732f6666643735662e706e67" width="30" height="30" /></td>
</table>
