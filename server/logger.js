var chalk = require('chalk');

function request(req, res, next) {
    var now = new Date(Date.now()).toUTCString();
    console.log('[' + now + ']' + ' ' + chalk.cyan(req.method + ' ' + req.url));
    next();
}




exports.request = request;
