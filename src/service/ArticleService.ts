import { Repository } from "typeorm";
import { Article } from "../entity/Article";
import Page from "../model/Page";

export default class ArticleService {

    private repository: Repository<Article>;

    constructor(repository: Repository<Article>) {
        this.repository = repository;
    }

    public async getPageOfArticles(pageSize: number, page: number): Promise<Page> {
        if (isNaN(pageSize) || isNaN(page) || page < 1) {
            const err = new Error("Query parameters must be positive natural numbers!");
            err.name = "ValidationError";
            throw err;
        }
        const skip = pageSize * (page -1);
        const articlesAndCount = await this.repository.findAndCount({skip: skip, take: pageSize});
        const respBody = {
            meta: {
                pageSize: pageSize,
                pageCount: Math.ceil(articlesAndCount[1] / pageSize),
                page: page,
                count: articlesAndCount[1]
            },
            articles: articlesAndCount[0]
        }
        return respBody;
    }

    public async create(article: Article): Promise<Article> {
        const articleEntity = await this.repository.save(article);
        return articleEntity;
    }

    public async getById(id: number): Promise<Article> {
        return await this.repository.findOne(id);
    }

    public async getCount(): Promise<number> {
        return await this.repository.count();
    }

}