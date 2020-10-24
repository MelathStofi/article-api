import {getRepository, Repository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Article } from "../entity/Article";
import fetch from "node-fetch";
import ArticleService from "../service/ArticleService";

export class ArticleController {

    private articleService: ArticleService;

    constructor(articleService: ArticleService) {
        this.articleService = articleService;
    }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        return await this.articleService.getAll();
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<Article> {
        const articleEntity = await this.articleService.create(req.body);
        return articleEntity;
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<Article> {
        return await this.articleService.getById(parseInt(req.params.id));
    }

}