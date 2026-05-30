import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';

const routes: Routes = [
  { path: '', component: CreateComponent },
  { path: 'c', component: CreateComponent },
  { path: 'r/:id', component: ReadComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilesRoutingModule { }
