import {NextFunction, Request, Response} from "express";
import { Article } from "../entity/Article";
import Err from "../error/Err";
import Page from "../model/Page";
import ArticleService from "../service/ArticleService";

export default class ArticleController {

    private articleService: ArticleService;

    constructor(articleService: ArticleService) {
        this.articleService = articleService;
    }

    public async getPage(req: Request, res: Response, next: NextFunction): Promise<Page> {
        try {
            const pageSize = parseInt((req.query as any).pageSize);
            const page = parseInt((req.query as any).page);
            return await this.articleService.getPageOfArticles(pageSize, page);
        } catch (err) {
            next(err);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<Article> {
        try {
            const articleEntity = await this.articleService.create(req.body);
            return articleEntity;
        } catch (err) {
            next(err);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<Article> {
        try {
            return await this.articleService.getById(parseInt(req.params.id));
        } catch (err) {
            next(new Err("NotFound", "Article not found"));
        }
    }

}