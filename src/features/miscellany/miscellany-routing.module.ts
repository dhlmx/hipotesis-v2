import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WaterConsumption } from './water-consumption/water-consumption';

const routes: Routes = [
  { path: '', component: WaterConsumption },
  { path: 'water-consumption', component: WaterConsumption }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiscellanyRoutingModule { }
