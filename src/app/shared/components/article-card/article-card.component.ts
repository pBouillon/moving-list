import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article, FALLBACK_IMAGE } from '../../models/article';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent {

  /**
   * Article whose information will be displayed
   */
  @Input()
  article!: Article;

  /**
   * Get the path to the article's image according to the current environment
   */
  get imagePath(): string {
    return environment.base + '/' + (this.article.imagePath || FALLBACK_IMAGE);
  }

  /**
   * Get the content of the `mailto:` link for the current article
   */
  get mailRef(): string {
    return `${environment.contact}?subject=Moving list: ${this.article.name}`;
  }

  /**
   * Get the Telegram contact link
   */
  get telegramRef(): string {
    return 'https://t.me/' + environment.telegramUsername;
  }

  /**
   * Open the article's image in a new tab
   */
  openImage() : void {
    window.open(this.imagePath, '_blank');
  }

}
