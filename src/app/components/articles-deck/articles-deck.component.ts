import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, EMPTY, Observable } from 'rxjs';
import { Article } from 'src/app/shared/models/article';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-articles-deck',
  templateUrl: './articles-deck.component.html',
  styleUrls: ['./articles-deck.component.css']
})
export class ArticlesDeckComponent implements OnInit {

  /**
   * Articles that will be displayed in the deck
   */
  articles$: Observable<Article[]> = EMPTY;

  /**
   * Whether or not only the articles that are still available will be displayed
   */
  showOnlyAvailable$ = new BehaviorSubject<boolean>(false);

  /**
   * @param articleService Service used to retrieve the articles from the source
   */
  constructor(
    public readonly articleService: ArticleService,
  ) { }

  /**
   * Define the subscription that will populate the `articles` observable
   */
  ngOnInit(): void {
    this.articles$ = combineLatest([
      this.articleService.getArticles(),
      this.showOnlyAvailable$,
    ]).pipe(
      map(([articles, showOnlyAvailable]) => showOnlyAvailable
        ? articles.filter(article => article.isAvailable)
        : articles)
    );
  }

  /**
   * Toggle the filter on article's availability
   */
  toggleFilter(): void {
    const currentValue = this.showOnlyAvailable$.getValue();
    this.showOnlyAvailable$.next(!currentValue);
  }

}
