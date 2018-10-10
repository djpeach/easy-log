const dbLogger = require('../../')('db', { formatted: true });
const routeLogger = require('../../')('route');


dbLogger('This one will not work');
dbLogger.enable()
dbLogger('Now it will work');

// The same applies for routeLogger()
