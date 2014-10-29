var chalk = require('chalk');

function logger(req, res, next) {
    var now = new Date(Date.now()).toUTCString();
    console.log('[' + now + ']' + ' ' + chalk.cyan(req.method + ' ' + req.url));
    next();
}

module.exports = logger;