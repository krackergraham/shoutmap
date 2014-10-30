var chalk = require('chalk');

function request(req, res, next) {
    var now = new Date(Date.now()).toUTCString();
    console.log('[' + now + ']' + ' ' + chalk.cyan(req.method + ' ' + req.url));
    next();
}

function error(msg) {
    console.log(chalk.red('Error: ' + msg));
}

function log(msg) {
    console.log(chalk.white(msg));
}

function success(msg) {
    console.log(chalk.green(msg));
}


module.exports = {
    request: request,
    error: error,
    log: log,
    success: success
};
