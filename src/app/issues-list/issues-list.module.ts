import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssuesListRoutingModule } from './issues-list.routing';
import { IssuesListComponent } from './issues-list.component';
import { IssuesListContainerComponent } from './issues-list-container/issues-list-container.component';
import { IssuesTableComponent } from './issues-table/issues-table.component';
import { IssuesService } from './issues-service/issues.service';
import { IssuesUploadComponent } from './issues-upload/issues-upload.component';
import { IssuesFacade } from './issues-facade/issues-facade.service';

@NgModule({
  declarations: [
    IssuesListComponent,
    IssuesListContainerComponent,
    IssuesTableComponent,
    IssuesUploadComponent,
  ],
  imports: [CommonModule, IssuesListRoutingModule],
  providers: [IssuesService, IssuesFacade],
})
export class IssuesListModule {}
