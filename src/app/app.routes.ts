import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '../core/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/daily', pathMatch: 'full' },
  { path: 'daily', loadChildren: () => import('./../features/daily/daily.module').then(m => m.DailyModule) },
  { path: 'mind-maps', loadChildren: () => import('./../features/mind-maps/mind-maps.module').then(m => m.MindMapsModule) },
  { path: '**', component: PageNotFoundComponent }
];
