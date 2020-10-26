import { Article } from "../entity/Article";
import fetch from "node-fetch";
import { getRepository } from "typeorm";

export async function initArticles(): Promise<void> {
    const repo = getRepository(Article);
    if (await repo.count() === 0) {
        const res = await fetch("http://newsapi.org/v2/everything?sources=techcrunch&apiKey=f51c8019bac94ab68ca31d732eaa1ee2");
        const json = await res.json();
        for (let a of json.articles) {
            const article = new Article();
            article.title = a.title;
            article.author = a.author;
            article.imageUrl = a.urlToImage;
            article.description = a.description;
            await repo.save(article);
        }
    }
}