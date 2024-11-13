import express from "express";
import cors from "cors";
import config from "./config";
import routes from "./infrastructure/routes";
const app = express();
app.use(express.json());
app.use(cors());

app.use(`/api/${config.API_VERSION}`, routes);

export default app;
