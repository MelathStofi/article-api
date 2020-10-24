import { Article } from "../entity/Article";
import ArticleService from "./ArticleService";
import fetch = require("node-fetch");

export async function initArticles(articleService: ArticleService): Promise<void> {
    if (await articleService.getCount() === 0) {
        const res = await fetch("http://newsapi.org/v2/everything?sources=techcrunch&apiKey=f51c8019bac94ab68ca31d732eaa1ee2");
        const json = await res.json();
        for (let a of json.articles) {
            const article = new Article();
            article.title = a.title;
            article.author = a.author;
            article.imageUrl = a.urlToImage;
            article.description = a.description;
            await articleService.create(article);
        }
    }
}