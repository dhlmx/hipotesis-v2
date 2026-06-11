import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '../core/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tejidos', pathMatch: 'full' },
  { path: 'tejidos', loadChildren: () => import('./../features/professions/professions.module').then(m => m.ProfessionsModule) },
  { path: '**', component: PageNotFoundComponent }
];
