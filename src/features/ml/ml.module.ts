import { NgModule } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NgxImageCompressService } from 'ngx-image-compress';
import { MLRoutingModule } from './ml-routing.module';

// Components
import { KMeans } from './k-means/k-means';
import { PolynomialRegression } from './polynomal-regression/polynomial-regression';

@NgModule({
  declarations: [
  ],
  imports: [
    KMeans,
    PolynomialRegression,
    NgOptimizedImage,
    MLRoutingModule,
  ],providers: [
    NgxImageCompressService
  ]
})
export class MLModule { }
