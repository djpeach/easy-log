const dbLogger = require('../../')('db');
const routeLogger = require('../../')('route');

dbLogger.enable();
routeLogger.enable();

dbLogger('testing the db Logger');
routeLogger('testing the route Logger');
dbLogger('This one will not work');
dbLogger.enable()
dbLogger('Now it will work');

// The same applies for routeLogger()

function myFunc() {
    dbLogger('This is inside a function');
}

myFunc();