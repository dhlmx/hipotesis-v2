import { NgModule } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NgxImageCompressService } from 'ngx-image-compress';
import { FilesRoutingModule } from './files-routing.module';

// Components
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { PolynomialRegression } from '../ml/polynomal-regression/polynomial-regression';

@NgModule({
  declarations: [
  ],
  imports: [
    CreateComponent,
    ReadComponent,
    PolynomialRegression,
    NgOptimizedImage,
    FilesRoutingModule,
  ],providers: [
    NgxImageCompressService
  ]
})
export class FilesModule { }
