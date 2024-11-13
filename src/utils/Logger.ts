import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';

export class Logger {
  private logger: WinstonLogger;

  constructor() {
    // Setting up the logger instance
    this.logger = createLogger({
      level: 'info', // Default log level
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      ),
      transports: [
        // Output logs to console
        new transports.Console({
          format: format.combine(
            format.colorize(), // Colorizes logs in console
            format.simple()
          ),
        }),
        // Output logs to a file
        new transports.File({ filename: 'logs/error.log', level: 'error' }), // Error logs
        new transports.File({ filename: 'logs/combined.log' }) // All logs
      ],
    });
  }

  // Info log method
  info(message: string, meta?: unknown): void {
    this.logger.info(message, meta);
  }

  // Warning log method
  warn(message: string, meta?: unknown): void {
    this.logger.warn(message, meta);
  }

  // Error log method
  error(message: string, meta?: unknown): void {
    this.logger.error(message, meta);
  }

  // Debug log method
  debug(message: string, meta?: unknown): void {
    this.logger.debug(message, meta);
  }
}

export const logger = new Logger();
