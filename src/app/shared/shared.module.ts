import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { QRCodeModule } from 'angularx-qrcode';



@NgModule({
  declarations: [
    ArticleCardComponent,
    QrCodeComponent,
  ],
  imports: [
    CommonModule,
    QRCodeModule
  ],
  exports: [
    ArticleCardComponent,
    QrCodeComponent,
  ],
})
export class SharedModule { }
