import { NgModule } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NgxImageCompressService } from 'ngx-image-compress';
import { MathRoutingModule } from './math-routing.module';

// Components
import { Graphs } from './graphs/graphs';

@NgModule({
  declarations: [
  ],
  imports: [
    Graphs,
    NgOptimizedImage,
    MathRoutingModule,
  ],providers: [
    NgxImageCompressService
  ]
})
export class MathModule { }
