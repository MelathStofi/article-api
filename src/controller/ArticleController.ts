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

    public async getPage(req: Request, res: Response, next: NextFunction) {
        const pageSize = parseInt((req.query as any).pageSize);
        const page = parseInt((req.query as any).page);
        return await this.articleService.getPageOfArticles(pageSize, page);
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<Article> {
        const articleEntity = await this.articleService.create(req.body);
        return articleEntity;
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<Article> {
        return await this.articleService.getById(parseInt(req.params.id));
    }

}