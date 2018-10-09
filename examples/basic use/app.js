const dbLogger = require('../../')('db', { formatted: true });
const routeLogger = require('../../')('route');

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


