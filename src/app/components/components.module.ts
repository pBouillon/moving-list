import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { ArticlesDeckComponent } from './articles-deck/articles-deck.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    ArticlesDeckComponent,
    HeroComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    ArticlesDeckComponent,
    HeroComponent,
    NavbarComponent,
    FooterComponent,
  ]
})
export class ComponentsModule { }
