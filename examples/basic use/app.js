const dbLogger = require('logger')('db', { formatted: true });
const routeLogger = require('logger')('route');

// const dbLogger = logger('db');
dbLogger('testing the db logger');
routeLogger('testing the route logger 1');
routeLogger.enable();
routeLogger('testing the route logger 2');
routeLogger('testing the route logger 2');
routeLogger.disable();
routeLogger('testing the route logger 3');
routeLogger.enable();
routeLogger('testing the route logger 2');
routeLogger('testing the route logger 2');


