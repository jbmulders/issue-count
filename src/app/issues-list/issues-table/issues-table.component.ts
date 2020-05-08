import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IIssue } from 'app/model/issue';
import { ITabelState } from 'app/model/tabel-state';

@Component({
  selector: 'app-issues-table',
  templateUrl: './issues-table.component.html',
  styleUrls: ['./issues-table.component.scss'],
})
export class IssuesTableComponent {
  @Input() tableHeaders: { value: string; sortProp: string; label: string }[];
  @Input() issues: IIssue[];
  @Input() tableState: ITabelState;
  @Output() sortPropChange: EventEmitter<{ prop: string }> = new EventEmitter();
  @Output() pageChange: EventEmitter<{ page: number }> = new EventEmitter();

  headerClicked(prop: string) {
    this.sortPropChange.emit({ prop });
  }

  setPage(page: number) {
    this.pageChange.emit({ page });
  }
}
