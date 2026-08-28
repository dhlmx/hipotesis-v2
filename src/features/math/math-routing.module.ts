import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Graphs } from './graphs/graphs';

const routes: Routes = [
  { path: '', component: Graphs },
  { path: 'graphs', component: Graphs }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MathRoutingModule { }
