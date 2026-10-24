import { NgModule } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NgxImageCompressService } from 'ngx-image-compress';
import { MLRoutingModule } from './ml-routing.module';

// Components
import { AssociationRules } from './association-rule/association-rules';
import { KMeans } from './k-means/k-means';
import { KNearestNeighbor } from './k-nearest-neighbor/k-nearest-neighbor';
import { NaiveBayes } from './naive-bayes/naive-bayes';
import { PolynomialRegression } from './polynomal-regression/polynomial-regression';
import { SupportVectorMachine } from './support-vector-machine/support-vector-machine';
import { RandomForest } from './random-forest/random-forest';

@NgModule({
  declarations: [
  ],
  imports: [
    AssociationRules,
    KMeans,
    KNearestNeighbor,
    NaiveBayes,
    NgOptimizedImage,
    PolynomialRegression,
    RandomForest,
    SupportVectorMachine,
    MLRoutingModule,
  ],providers: [
    NgxImageCompressService
  ]
})
export class MLModule { }
