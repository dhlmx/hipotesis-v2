import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '../core/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/math/graphs', pathMatch: 'full' },
  { path: 'files', loadChildren: () => import('./../features/files/files.module').then(m => m.FilesModule) },
  { path: 'math', loadChildren: () => import('./../features/math/math.module').then(m => m.MathModule) },
  { path: 'misc', loadChildren: () => import('./../features/miscellany/miscellany.module').then(m => m.MiscellanyModule ) },
  { path: 'ml', loadChildren: () => import('./../features/ml/ml.module').then(m => m.MLModule) },
  { path: '**', component: PageNotFoundComponent }
];
