import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PolynomialRegression } from './polynomal-regression/polynomial-regression';

const routes: Routes = [
  { path: '', component: PolynomialRegression },
  { path: 'pr', component: PolynomialRegression }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MLRoutingModule { }
