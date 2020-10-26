import { Article } from "../entity/Article";

export default interface Page {
    meta: {
        pageSize: number,
        pageCount: number,
        page: number,
        count: number
    },
    articles: Array<Article>
}