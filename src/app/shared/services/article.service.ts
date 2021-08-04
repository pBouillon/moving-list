import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";

import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  /**
   * The path to the JSON file containing the articles
   */
  private readonly DATA_SOURCE = environment.base + '/articles.json';

  /**
   * @param http HTTP client used to digest the JSON of the data source
   */
  constructor(
    private readonly http: HttpClient,
  ) { }

  /**
   * Get all articles defined in the data source
   * @param source Path to the file or the URL containing articles as JSON
   * @returns An observable containing all articles, sorted by their name
   */
  getArticles(source = this.DATA_SOURCE): Observable<Article[]> {
    return this.http.get<Article[]>(source).pipe(
      map((articles: Article[]) => articles.sort((a, b) => a.name.localeCompare(b.name))),
    );
  }

}
