import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KMeans } from './k-means/k-means';
import { PolynomialRegression } from './polynomal-regression/polynomial-regression';

const routes: Routes = [
  { path: '', component: PolynomialRegression },
  { path: 'km', component: KMeans },
  { path: 'pr', component: PolynomialRegression }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MLRoutingModule { }
