import { Component, OnInit } from '@angular/core';
import { IssuesFacade } from '../issues-facade/issues-facade.service';
import { Observable } from 'rxjs';
import { IIssue } from 'app/model/issue';
import { ITabelState } from 'app/model/tabel-state';

@Component({
  selector: 'app-issues-list-container',
  templateUrl: './issues-list-container.component.html',
  styleUrls: ['./issues-list-container.component.scss'],
})
export class IssuesListContainerComponent implements OnInit {
  issues$: Observable<IIssue[]>;
  tableState$: Observable<ITabelState>;
  tableHeaders: { value: string; sortProp: string; label: string }[];

  constructor(private issuesFacade: IssuesFacade) {}

  ngOnInit(): void {
    this.issues$ = this.issuesFacade.getIssues();
    this.tableState$ = this.issuesFacade.tableState$;
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
