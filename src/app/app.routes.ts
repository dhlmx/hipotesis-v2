import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '../core/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/mantenimiento', pathMatch: 'full' },
  { path: 'files', loadChildren: () => import('./../features/files/files.module').then(m => m.FilesModule) },
  { path: 'mantenimiento', loadChildren: () => import('./../features/maintenance/maintenance.module').then(m => m.MaintenanceModule) },
  { path: '**', component: PageNotFoundComponent }
];
