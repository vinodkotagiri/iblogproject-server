import 'dotenv/config'; 
import http from "http";
import app from "./app";
import config from "./config";
import { logger } from "./utils/Logger";
const server=http.createServer(app);

server.listen(config.PORT,()=>{
    logger.info(`Server running on port ${config.PORT}`);
    config.connectDB();
})