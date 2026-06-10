import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '../core/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/daily', pathMatch: 'full' },
  { path: 'daily', loadChildren: () => import('./../features/daily/daily.module').then(m => m.DailyModule) },
  { path: 'files', loadChildren: () => import('./../features/files/files.module').then(m => m.FilesModule) },
  { path: 'maintenance', loadChildren: () => import('./../features/maintenance/maintenance.module').then(m => m.MaintenanceModule) },
  { path: 'mind-maps', loadChildren: () => import('./../features/mind-maps/mind-maps.module').then(m => m.MindMapsModule) },
  { path: 'professions', loadChildren: () => import('./../features/professions/professions.module').then(m => m.ProfessionsModule) },
  { path: '**', component: PageNotFoundComponent }
];
