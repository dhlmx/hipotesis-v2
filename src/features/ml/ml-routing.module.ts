import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssociationRules } from './association-rule/association-rules';
import { KMeans } from './k-means/k-means';
import { KNearestNeighbor } from './k-nearest-neighbor/k-nearest-neighbor';
import { NaiveBayes } from './naive-bayes/naive-bayes';
import { PolynomialRegression } from './polynomal-regression/polynomial-regression';
import { RandomForest } from './random-forest/random-forest';
import { SupportVectorMachine } from './support-vector-machine/support-vector-machine';

const routes: Routes = [
  { path: '', component: KMeans },
  { path: 'ar', component: AssociationRules },
  { path: 'km', component: KMeans },
  { path: 'knn', component: KNearestNeighbor },
  { path: 'nb', component: NaiveBayes },
  { path: 'pr', component: PolynomialRegression },
  { path: 'rf', component: RandomForest },
  { path: 'svm', component: SupportVectorMachine }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MLRoutingModule { }
