import { of } from "rxjs";
import { Article, FALLBACK_IMAGE } from "../models/article";
import { ArticleService } from "./article.service";

describe('ArticleService', () => {
    let httpClientSpy: { get: jasmine.Spy };
    let service: ArticleService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new ArticleService(httpClientSpy as any);
      });

    it('#getArticles should return an array of sorted articles', async () => {
        const rawArticles: Article[] = [
            {
                name: '2',
                description: 'Article 2',
                imagePath: FALLBACK_IMAGE,
                isAvailable: false,
                price: 0
            },
            {
                name: '3',
                description: 'Article 3',
                imagePath: FALLBACK_IMAGE,
                isAvailable: false,
                price: 0
            },
            {
                name: '1',
                description: 'Article 1',
                imagePath: FALLBACK_IMAGE,
                isAvailable: false,
                price: 0
            },
        ];

        const articlesSortedByName: Article[] =
            rawArticles.sort((a, b) => a.name.localeCompare(b.name));

        httpClientSpy.get.and.returnValue(of(rawArticles));

        service.getArticles().subscribe(
            articles => expect(articles).toEqual(articlesSortedByName),
        );

        expect(httpClientSpy.get.calls.count()).toBe(1);
    });
});
