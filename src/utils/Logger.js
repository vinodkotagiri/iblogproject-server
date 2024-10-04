const winston = require('winston');

class Logger {
    constructor(options = {}) {
        this.logger = winston.createLogger({
            level: options.level || 'info',
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.json()
            ),
            transports: [
                new
                    winston.transports.Console({
                        format: winston.format.combine(
                            winston.format.colorize(),
                            winston.format.simple()
                        )
                    }),
                new winston.transports.File({ filename: "server.logs" })
            ],

        });

        if
            (options.file) {
            this.logger.add(new winston.transports.File({ filename: options.file }));
        }
    }

    log(level, message, ...meta) {
        this.logger.log(level, message, ...meta);
    }

    error(message, ...meta) {
        this.log('error', message, ...meta);
    }

    warn(message, ...meta) {
        this.log('warn', message, ...meta);
    }

    info(message, ...meta) {
        this.log('info', message, ...meta);
    }

    debug(message, ...meta) {
        this.log('debug', message, ...meta);

    }

    silly(message, ...meta) {
        this.log('silly', message, ...meta);
    }
}

module.exports = Logger;