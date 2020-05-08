import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssuesListContainerComponent } from './issues-list-container/issues-list-container.component';
import { IssuesListComponent } from './issues-list.component';

const routes: Routes = [
  {
    path: '',
    component: IssuesListComponent,
    children: [
      {
        path: 'list',
        component: IssuesListContainerComponent,
      },
      {
        path: '',
        redirectTo: 'list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssuesListRoutingModule {}
