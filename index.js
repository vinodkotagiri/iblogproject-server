const dotenv=require('dotenv');
dotenv.config();
const Logger=require('./src/utils/Logger');
const logger=new Logger();
const config=require('./src/config')
config.app.listen(config.port, async() => {
    logger.info(`Server running on port ${process.env.PORT}`);
    await config.db(config.dbUrl, logger)
    .then(conn=>logger.info(`Connected to database on ${conn.connection.host}:${conn.connection.port}`))
    .catch(error=>logger.error("Error connecting to database",error));
})