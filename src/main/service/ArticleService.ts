import { Repository } from "typeorm";
import { Article } from "../entity/Article";
import Err from "../error/Err";
import Page from "../model/Page";

export default class ArticleService {

    private repository: Repository<Article>;

    constructor(repository: Repository<Article>) {
        this.repository = repository;
    }

    public async getPageOfArticles(pageSize: number, page: number): Promise<Page> {
        if (isNaN(pageSize) || isNaN(page) || page < 1 || pageSize < 1) {
            throw new Err("ValidationError", "Query parameters must be positive natural numbers!");
        }
        const skip = pageSize * (page -1);
        const [articles, count] = await this.repository.findAndCount({skip: skip, take: pageSize});
        const pageCount = Math.ceil(count / pageSize);
        if (page > pageCount) throw new Err("NotFound", "No such page");
        return {
            meta: {
                pageSize: pageSize,
                pageCount: pageCount,
                page: page,
                count: count
            },
            articles: articles
        }
    }

    public async create(article: Article): Promise<Article> {
        const articleEntity = await this.repository.save(article);
        return articleEntity;
    }

    public async getById(id: number): Promise<Article> {
        if (isNaN(id) || id < 1 || id > await this.repository.count())
            throw new Err("NotFound", "Article not found");
        return await this.repository.findOne(id);
    }

    public async getCount(): Promise<number> {
        return await this.repository.count();
    }

}