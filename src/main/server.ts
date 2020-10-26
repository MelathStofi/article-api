import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {getServerDetails, getORMConfig} from "./config";
import {registerRoutes} from "./routes/routes";
import { initArticles } from "./service/InitArticles";

createConnection(getORMConfig()).then(async connection => {
    const app = express();
    app.use(bodyParser.json());
    app.use("/static", express.static(process.cwd() + "/static"));
    
    await connection.synchronize();
    //initArticles();
    registerRoutes(app);

    const port = getServerDetails().PORT;
    app.listen(port);

    console.log(`Express server has started on port ${port}. Check out \"http://localhost:${port}/docs\"!`);

}).catch(error => console.log(error));