const dbLogger = require('../../')('app:db', { colorCode: 40 })
    , basicLogger = require('../../')('app:basic', { colorCode: 45 });

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