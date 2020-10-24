import {Request, Response, Application} from "express";
import { ArticleController } from "../controller/ArticleController";
import TokenController from "../controller/TokenController";
import errorHandler from "../middleware/errorHandler";
import swaggerRouter from "../helper/swagger";
import ArticleService from "../service/ArticleService";

const Routes = [
    {
        method: "get",
        route: "/articles",
        controller: ArticleController,
        action: "getPage"
    },
    {
        method: "post",
        route: "/articles",
        controller: ArticleController,
        action: "create"
    },
    {
        method: "get",
        route: "/articles/:id",
        controller: ArticleController,
        action: "getById"
    },
    {
        method: "post",
        route: "/auth/create-token",
        controller: TokenController,
        action: "create"
    },
    {
        method: "put",
        route: "/auth/renew-token",
        controller: TokenController,
        action: "renew"
    }
];

export function registerRoutes(app: Application, aS: ArticleService): void {
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any)(aS))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
    app.use('/api-docs', swaggerRouter);
    app.use(errorHandler);
}