var chalk = require('chalk');

var logger = module.exports;

logger.request = function (req, res, next) {
    var now = new Date(Date.now()).toUTCString();
    console.log('[' + now + ']' + ' ' + chalk.cyan(req.method + ' ' + req.url));
    next();
};

logger.error = function (msg) {
    console.log(chalk.red('Error: ' + msg));
};

logger.log = function (msg) {
    console.log(chalk.white(msg));
};

logger.success = function (msg) {
    console.log(chalk.green(msg));
};
