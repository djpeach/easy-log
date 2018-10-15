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