import { Repository } from "typeorm";
import { Article } from "../entity/Article";

export default class ArticleService {

    private repository: Repository<Article>;

    constructor(repository: Repository<Article>) {
        this.repository = repository;
    }

    public async getAll(): Promise<Array<Article>> {
        return await this.repository.find();
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