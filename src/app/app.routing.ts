import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: 'issues',
    loadChildren: () =>
      import('./issues-list/issues-list.module').then(
        (m) => m.IssuesListModule
      ),
  },
  {
    path: '',
    redirectTo: 'issues',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'issues',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
