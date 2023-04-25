const chalk = require('chalk');

const clog = console.log;

const log = (args) => clog(chalk.blue(args));
const info = (args) => clog(chalk.blue(`[${new Date().toLocaleString()}] [INFO]`), typeof args === 'string' ? chalk.blueBright(args) : args);
const warning = (args) => clog(chalk.yellow(`[${new Date().toLocaleString()}] [WARN]`), typeof args === 'string' ? chalk.yellowBright(args) : args);
const error = (args) => clog(chalk.red(`[${new Date().toLocaleString()}] [ERROR]`), typeof args === 'string' ? chalk.redBright(args) : args);
const success = (args) => clog(chalk.green(`[${new Date().toLocaleString()}] [SUCCESS]`), typeof args === 'string' ? chalk.greenBright(args) : args);
const debug = (args) => clog(chalk.magenta(`[${new Date().toLocaleString()}] [DEBUG]`), typeof args === 'string' ? chalk.magentaBright(args) : args);
const verbose = (args) => clog(chalk.cyan(`[${new Date().toLocaleString()}] [VERBOSE]`), typeof args === 'string' ? chalk.cyanBright(args) : args);

module.exports = {
    log,
    info,
    warning,
    error,
    success,
    debug,
    verbose
};
