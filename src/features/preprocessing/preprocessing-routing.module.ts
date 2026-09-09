import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoiseHandling } from './noise-handling/noise-handling';

const routes: Routes = [
  { path: '', component: NoiseHandling },
  { path: 'nh', component: NoiseHandling }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreprocessingRoutingModule { }
