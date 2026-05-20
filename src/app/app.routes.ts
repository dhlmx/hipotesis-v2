import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '../core/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/mind-maps', pathMatch: 'full' },
  { path: 'daily', loadChildren: () => import('./../features/daily/daily.module').then(m => m.DailyModule) },
  { path: '**', component: PageNotFoundComponent }
];
