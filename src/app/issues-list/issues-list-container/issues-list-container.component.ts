import { Component, OnInit } from '@angular/core';
import { IssuesFacade } from '../issues-facade/issues-facade.service';
import { Observable } from 'rxjs';
import { IIssue, ITableState } from '@model';

@Component({
  selector: 'app-issues-list-container',
  templateUrl: './issues-list-container.component.html',
  styleUrls: ['./issues-list-container.component.scss'],
})
export class IssuesListContainerComponent implements OnInit {
  issues$: Observable<IIssue[]>;
  tableState$: Observable<ITableState>;
  error$: Observable<{ message: string }>;
  tableHeaders: { value: string; sortProp: string; label: string }[];

  constructor(private issuesFacade: IssuesFacade) {}

  ngOnInit(): void {
    this.issues$ = this.issuesFacade.getIssues();
    this.tableState$ = this.issuesFacade.tableState$;
    this.error$ = this.issuesFacade.errorMessage$;
    this.tableHeaders = this.issuesFacade.getTableHeaders();
  }

  fileChanged({ file }: { file: File }) {
    this.issuesFacade.handleFileUpload(file);
  }

  sortPropChanged({ prop }: { prop: string }) {
    this.issuesFacade.handleSortPropChanged(prop);
  }

  tablePageChanged({ page }: { page: number }) {
    this.issuesFacade.handleTablePageChanged(page);
  }
}
