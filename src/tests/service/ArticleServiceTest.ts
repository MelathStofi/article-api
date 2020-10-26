import { getRepository } from 'typeorm';
import { Article } from '../../main/entity/Article';
import ArticleService from '../../main/service/ArticleService';
import connection from '../config/connection';

beforeAll(async ()=>{
  await connection.create();
});

afterAll(async ()=>{
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});

it("get article by id", async () => {
  const repo = getRepository(Article);
  const service = new ArticleService(repo);
  const article = new Article();
  article.title = "test";
  article.description = "description";
  const articleEnt = await service.create(article);

  expect(await repo.count()).toBe(1);
  const gotArticle = await service.getById(articleEnt.id);
  expect(gotArticle).toStrictEqual(articleEnt);
});

it("creates an article", async () => {
  const repo = getRepository(Article);
  const service = new ArticleService(repo);
  const article = new Article();
  article.title = "test";
  article.description = "description";
  await service.create(article);
  expect(await repo.count()).toBe(1);
});

it("get articles on page", async () => {
  const repo = getRepository(Article);
  const service = new ArticleService(repo);
  for (let i = 0; i < 12; i++) {
    const article = new Article();
    article.title = "title" + i;
    article.description = "description" + i;
    await service.create(article);
  }
  const page = await service.getPageOfArticles(5, 3);
  expect(page.meta.pageSize).toBe(2);
  expect(page.meta.page).toBe(3);
  expect(page.meta.pageCount).toBe(3);
  expect(page.meta.count).toBe(12);
});
