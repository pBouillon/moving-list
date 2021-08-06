import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { EMPTY, of } from "rxjs";
import { Article } from "src/app/shared/models/article";
import { ArticleService } from "src/app/shared/services/article.service";
import { ArticlesDeckComponent } from "./articles-deck.component";

describe('ArticlesDeckComponent', () => {
    let component: ArticlesDeckComponent;
    let fixture: ComponentFixture<ArticlesDeckComponent>;

    let articleServiceMock: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ ArticlesDeckComponent ],
            providers: [{
                provide: ArticleService,
                useValue: jasmine.createSpyObj('ArticleService', ['getArticles'])
            }],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        });

        fixture = TestBed.createComponent(ArticlesDeckComponent);
        component = fixture.componentInstance;

        articleServiceMock = TestBed.inject(ArticleService);
    });

    it('Should display the default card when no articles are retrieved', () => {
        articleServiceMock.getArticles.and.returnValue(EMPTY);
        fixture.detectChanges();

        const defaultArticleCard = fixture.debugElement
            .query(By.css('#empty-articles-card'));

        expect(defaultArticleCard).toBeTruthy();
    });

    it('Should not display any article card when no articles are retrieved', () => {
        articleServiceMock.getArticles.and.returnValue(EMPTY);
        fixture.detectChanges();

        const articleCards = fixture.debugElement
            .queryAll(By.css('app-article-card'));

        expect(articleCards.length).toBe(0);
    });

    it('Should display as many articles as there are', () => {
        const articles: Article[] = [
            {
                name: 'My article #1',
                description: 'My article #1',
                imagePath: '',
                isAvailable: true,
                price: 50
            },
            {
                name: 'My article #2',
                description: 'My article #2',
                imagePath: '',
                isAvailable: false,
                price: 0
            },
            {
                name: 'My article #3',
                description: 'My article #3',
                imagePath: '',
                isAvailable: false,
                price: 10
            }
        ];

        articleServiceMock.getArticles.and.returnValue(of(articles));
        fixture.detectChanges();

        const articleCards = fixture.debugElement
            .queryAll(By.css('app-article-card'));

        expect(articleCards.length).toBe(articles.length);
    });

    it('Should only display the available articles when the filter is toggled', () => {
        const articles: Article[] = [
            {
                name: 'My article #1',
                description: 'My article #1',
                imagePath: '',
                isAvailable: true,
                price: 50
            },
            {
                name: 'My article #2',
                description: 'My article #2',
                imagePath: '',
                isAvailable: false,
                price: 0
            },
            {
                name: 'My article #3',
                description: 'My article #3',
                imagePath: '',
                isAvailable: false,
                price: 10
            }
        ];

        articleServiceMock.getArticles.and.returnValue(of(articles));
        component.showOnlyAvailable$.next(true);
        fixture.detectChanges();

        const articleCards = fixture.debugElement
            .queryAll(By.css('app-article-card'));

        const availableArticles = articles.filter(article => article.isAvailable);

        expect(articleCards.length).toBe(availableArticles.length);
    });
});
