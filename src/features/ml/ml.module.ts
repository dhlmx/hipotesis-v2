import { NgModule } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NgxImageCompressService } from 'ngx-image-compress';
import { MLRoutingModule } from './ml-routing.module';

// Components
import { PolynomialRegression } from './polynomal-regression/polynomial-regression';

@NgModule({
  declarations: [
  ],
  imports: [
    PolynomialRegression,
    NgOptimizedImage,
    MLRoutingModule,
  ],providers: [
    NgxImageCompressService
  ]
})
export class MLModule { }
