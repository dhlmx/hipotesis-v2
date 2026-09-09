import { NgModule } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NgxImageCompressService } from 'ngx-image-compress';
import { PreprocessingRoutingModule } from './preprocessing-routing.module';

// Components
import { NoiseHandling } from './noise-handling/noise-handling';

@NgModule({
  declarations: [
  ],
  imports: [
    NoiseHandling,
    NgOptimizedImage,
    PreprocessingRoutingModule,
  ],providers: [
    NgxImageCompressService
  ]
})
export class PreprocessingModule { }
