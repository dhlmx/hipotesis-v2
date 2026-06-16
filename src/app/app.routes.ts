import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '../core/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/files/r/1', pathMatch: 'full' },
  { path: 'files', loadChildren: () => import('./../features/files/files.module').then(m => m.FilesModule) },
  { path: '**', component: PageNotFoundComponent }
];
