import {Request, Response, Application, NextFunction} from "express";
import ArticleController from "../controller/ArticleController";
import TokenController from "../controller/TokenController";
import ImageController from "../controller/ImageController";
import errorHandler from "../middleware/errorHandler";
import swaggerRouter from "../helper/swagger";
import ArticleService from "../service/ArticleService";
import Joi = require("joi");
import validateRequest from "../middleware/validateRequest";
import authorize from "../middleware/authorize";
import { getRepository } from "typeorm";
import { Article } from "../entity/Article";


const Routes = [
    {
        method: "get",
        route: "/articles",
        middleware: nextFunction,
        controller: ArticleController,
        action: "getPage"
    },
    {
        method: "post",
        route: "/articles",
        middleware: authenticateArticleSchema,
        controller: ArticleController,
        action: "create"
    },
    {
        method: "get",
        route: "/articles/:id",
        middleware: authorize,
        controller: ArticleController,
        action: "getById"
    },
    {
        method: "post",
        route: "/auth/create-token",
        middleware: nextFunction,
        controller: TokenController,
        action: "createToken"
    },
    {
        method: "put",
        route: "/auth/renew-token",
        middleware: nextFunction,
        controller: TokenController,
        action: "renewToken"
    },
    {
        method: "post",
        route: "/image",
        middleware: nextFunction,
        controller: ImageController,
        action: "uploadImage"
    },
    {
        method: "get",
        route: "/image/:id",
        middleware: nextFunction,
        controller: ImageController,
        action: "getImage"
    }
];

export function registerRoutes(app: Application): void {
    Routes.forEach(route => {
        (app as any)[route.method](route.route, route.middleware, (req: Request, res: Response, next: NextFunction) => {
            const result = (new (route.controller as any)(getDependency(route.controller)))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
    app.use('/docs', swaggerRouter);
    app.use(errorHandler);
}

function authenticateArticleSchema(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string(),
        imageUrl: Joi.string(),
        description: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function nextFunction(req: Request, res: Response, next: NextFunction) {
    next();
}

function getDependency(dep: any) {
    if (dep === ArticleController) {
        return new ArticleService(getRepository(Article));
    }
    return null;
}
