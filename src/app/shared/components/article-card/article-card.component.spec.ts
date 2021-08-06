import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { Article } from "../../models/article";
import { ArticleCardComponent } from "./article-card.component";

describe('ArticleCardComponent', () => {
    let component: ArticleCardComponent;
    let fixture: ComponentFixture<ArticleCardComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ ArticleCardComponent ],
        });

        fixture = TestBed.createComponent(ArticleCardComponent);
        component = fixture.componentInstance;
    });

    it('Should show the article as free when the price is 0', () => {
        component.article = { price: 0 } as Article;
        fixture.detectChanges();

        const priceEl: HTMLParagraphElement = fixture.debugElement
            .query(By.css('#price'))
            .nativeElement;

        expect(priceEl.textContent).toMatch(/free/i);
    });

    it('Should show the article\'s price when the price is not 0', () => {
        component.article = { price: 1337 } as Article;
        fixture.detectChanges();

        const priceEl: HTMLParagraphElement = fixture.debugElement
            .query(By.css('#price'))
            .nativeElement;

        expect(priceEl.textContent).toMatch(/1?337/);
    });

    it('Should show the article as available if it is', () => {
        component.article = { isAvailable: true } as Article;
        fixture.detectChanges();

        const priceEl: HTMLParagraphElement = fixture.debugElement
            .query(By.css('#availability'))
            .nativeElement;

        expect(priceEl.textContent).toMatch(/available/i);
    });

    it('Should show the article as claimed if it is not available', () => {
        component.article = { isAvailable: false } as Article;
        fixture.detectChanges();

        const priceEl: HTMLParagraphElement = fixture.debugElement
            .query(By.css('#availability'))
            .nativeElement;

        expect(priceEl.textContent).toMatch(/claimed/i);
    });

    it('Should not display the links if the article is not available', () => {
        component.article = { isAvailable: false } as Article;
        fixture.detectChanges();

        const cardFooterEl = fixture.debugElement
            .query(By.css('.card-footer'));

        expect(cardFooterEl).toBeFalsy();
    });
});
