const dbLogger = require('../../')('db', { formatted: true });
const routeLogger = require('../../')('route');

dbLogger.enable();
routeLogger.enable();

dbLogger('testing the db Logger');
routeLogger('testing the route Logger');