import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  IssuesService,
  ESortDirection,
} from '../issues-service/issues.service';
import { IIssue, ITableState } from '@model';

@Injectable()
export class IssuesFacade {
  get tableState$(): Observable<ITableState> {
    return this.issuesService.tableState$;
  }

  get errorMessage$(): Observable<{ message: string }> {
    return this.issuesService.error$;
  }

  constructor(private issuesService: IssuesService) {}

  getTableHeaders(): { value: string; sortProp: string; label: string }[] {
    return [
      { value: 'firstName', sortProp: 'firstName', label: 'First Name' },
      { value: 'lastName', sortProp: 'lastName', label: 'Last Name' },
      { value: 'issueCount', sortProp: 'issueCount', label: 'Issue Count' },
      {
        value: 'dateOfBirth',
        sortProp: 'dateOfBirth_date',
        label: 'Date of Birth',
      },
    ];
  }

  getIssues$(): Observable<IIssue[]> {
    return combineLatest([this.issuesService.issues$, this.tableState$]).pipe(
      map(([issues, state]: [IIssue[], ITableState]) => {
        const order = state.direction === ESortDirection.asc ? 1 : -1;

        issues.sort((a, b) =>
          a[state.orderBy] > b[state.orderBy] ? order : -order
        );

        return issues.slice(
          (state.page - 1) * state.pageSize,
          state.page * state.pageSize
        );
      })
    );
  }

  handleFileUpload(file: File) {
    if (this.validateFile(file)) {
      const reader = new FileReader();

      reader.onerror = (event: ProgressEvent) =>
        this.issuesService.handleError(
          'Something went wrong uploading the file...'
        );
      reader.onload = (event: ProgressEvent) =>
        this.issuesService.changeIssues(
          (event.target as FileReader).result as string
        );

      reader.readAsText(file);
    } else {
      this.issuesService.handleError('The file seems to be invalid..');
    }
  }

  handleSortPropChanged(prop: string) {
    this.issuesService.changeSortProp(prop);
  }

  handleTablePageChanged(page: number) {
    this.issuesService.changePage(page);
  }

  private validateFile(file: File): boolean {
    return file?.type === 'text/csv';
  }
}
