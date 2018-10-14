# Debug-All

This module has sprung out of a dissatisfaction of all other current modules for debugging, logging, printing, etc. There are some that do color, some that do levels, some that do namespaces, and more. And there are some that do a combination of these. However I could NOT find one that did ALL of them, and some additional features I wanted. So I decided to build my own. How will mine be different? Well...

* Easy to use
    > many of them only have one way of doing things. But I know my preferred way of programming may not be your preferred way. So I will include multiple ways and syntaxes to do the same thing, so we can all build happily.
* Active
    > SOOOO many people have built the exact same logging module! I am starting to think it was a homework assignment! And they all fell into disuse and are not maintained. These modules are sitting on great npm package names too! However, I will be keeping this logger updated and continue adding features for a long time.
* Feature Full
    > All good loggers need this, but many of them stop short of filling out with all the features people want. Even easy features to add. I will be paying attention to feature requests and trying to build anything the people want!
* Conglomerate
    > I will be scouring the features of all other logger, so I can make sure this will be a one-stop-for-all logger module. We will have every feature other loggers have, combined, and then some. I want this to become the #1 logger module on npm, which will be hard, but if I give the people what they want, then we'll see!

## So features do we have so far?

Honestly, not much yet. I just started this week (10-10-18), and am adding features in between work and school. But we are going to get there. Here is what we have so far, as basic functionality:

### `Namespaces`

You can add custom loggers with namespaces, to differentiate between several loggin purposes. Like a logger for DataBases, and a logger for Rotues, for example.

Right now there is only one syntax for this, with more coming in the future.

```
const dbLogger = require('debug-all')('db');
const routesLogger = require('debug-all')('routes');

dbLogger('Something happened with my database');

routesLogger('And now something happened with my routes');
```

To enable namespace you have three options. The main way is to specify a `DEBUG` env variable when you run the module. This can be a single namespace, or a comma separated list of them.

```
DEBUG=db

// OR //

DEBUG=db,routes
```

More methods listed as features below.

### `Wildcard Namespace`

If you want to see al loggers, which I do a lot, just add a wildcard instead of each namespace.

```
DEBUG=*
```

### `Enabling and Disabling Namespaces`

You can also enable and disable namespaces programmatically, very easily.

```
const dbLogger = require('debug-all')('db');

dbLogger('Trying to use db logger'); // Won't work

dbLogger.enable();

dbLogger('Lets use it now'); // Will work

dbLogger.disable();

dbLogger('Trying it again'); // Won't work
```

### `Stack Trace your logging`

**THIS** was a key feature I could not find anywhere else, when it is very simple! I want to see where my program is logging these out. So perhaps if you add a log for some conditional, and then later you see that log, you do not have to remember where it was, you can see the file, the function, and even the line number. You can choose to use none of these, any of them you want, or all of them. Currently there is only one way to enable these, but again...more syntax to come.

So in file app.js:

```
1: const dbLogger = require('debug-all')('db');
2: 
3: let logFunc = () {
4:    dbLogger('This is logging out somewhere'); 
5: }
6: 
7: logFunc();
8: 
9: dbLogger('This is logging out somewhere else'); 
```

The above will log out:

```
db | 
```