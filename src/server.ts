import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {getServerDetails, getORMConfig} from "./config";
import {registerRoutes} from "./routes/routes";
import ArticleService from "./service/ArticleService";
import { initArticles } from "./service/InitArticles";
import { Article } from "./entity/Article";

createConnection(getORMConfig()).then(async connection => {
    const app = express();
    app.use(bodyParser.json());

    connection.synchronize();
    const articleRepository = connection.getRepository(Article);
    const articleService = new ArticleService(articleRepository);
    initArticles(articleService);
    registerRoutes(app, articleService);

    const port = getServerDetails().PORT;
    app.listen(port);

    console.log(`Express server has started on port ${port}. Open http://localhost:${port}/articles to see results`);

}).catch(error => console.log(error));
