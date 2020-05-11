import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IIssue, EIssueProps, ITableState } from '@model';

export enum ESortDirection {
  asc = 'asc',
  dsc = 'dsc',
}

@Injectable()
export class IssuesService {
  private issuesSubject: BehaviorSubject<IIssue[]>;
  private tableStateSubject: BehaviorSubject<ITableState>;
  private errorSubject: BehaviorSubject<{ message: string }>;

  // table state
  private issues: IIssue[];
  private sortProp: string;
  private sortDirection: string;
  private tablePage: number;
  private tableTotalPages: number;
  private tableTotalItems: number;
  public tablePageSize: number;

  get issues$(): Observable<IIssue[]> {
    return this.issuesSubject.asObservable();
  }
  get tableState$(): Observable<ITableState> {
    return this.tableStateSubject.asObservable();
  }
  get error$(): Observable<{ message: string }> {
    return this.errorSubject.asObservable();
  }

  constructor() {
    // default table state
    this.issues = [];
    this.sortProp = EIssueProps.lastName;
    this.sortDirection = ESortDirection.asc;
    this.tablePage = 1;
    this.tableTotalPages = 1;
    this.tablePageSize = 10;

    this.issuesSubject = new BehaviorSubject(this.issues);
    this.tableStateSubject = new BehaviorSubject(this.getTableState());
    this.errorSubject = new BehaviorSubject(null);
  }

  changeIssues(fileContent: string) {
    const rows = fileContent.split('\n');
    const headers = rows.splice(0, 1); // assuming that the first row contains headers

    this.issues = rows
      .filter((row) => row.length > 0)
      .map((row) => this.getIssueByRow(row));

    this.tableTotalItems = this.issues.length;
    this.tablePage = 1;
    this.sortProp = EIssueProps.lastName;
    this.sortDirection = ESortDirection.asc;
    this.tableTotalPages = Math.ceil(this.issues.length / this.tablePageSize);

    if (this.issues.length > 0) {
      this.notify();
    } else {
      this.handleError('No data...');
    }
  }

  changeSortProp(prop: string) {
    if (this.sortProp === prop) {
      this.changeSortDirection();
    } else {
      this.sortProp = prop;
      this.sortDirection = ESortDirection.asc;
    }

    this.tablePage = 1;
    this.notify();
  }

  handleError(message: string) {
    this.errorSubject.next({ message });
  }

  changePage(page: number) {
    if (page > 0 && page <= this.tableTotalPages) {
      this.tablePage = page;
      this.notify();
    }
  }

  changePageSize(size: number) {
    if (size > 0) {
      this.tablePage = 1;
      this.tablePageSize = size;
      this.tableTotalPages = Math.ceil(this.issues.length / this.tablePageSize);
      this.notify();
    }
  }

  private changeSortDirection() {
    this.sortDirection =
      this.sortDirection === ESortDirection.asc
        ? ESortDirection.dsc
        : ESortDirection.asc;
  }

  private getIssueByRow(row: string): IIssue {
    const props = row.split(';');

    return {
      firstName: props[0],
      lastName: props[1],
      issueCount: +props[2],
      dateOfBirth: props[3],
      dateOfBirth_date: new Date(props[3]),
    };
  }

  private getTableState(): ITableState {
    return {
      page: this.tablePage,
      totalPages: this.tableTotalPages,
      orderBy: this.sortProp,
      direction: this.sortDirection,
      pageSize: this.tablePageSize,
      totalItems: this.tableTotalItems,
    };
  }

  private notify() {
    this.issuesSubject.next(this.issues);
    this.tableStateSubject.next(this.getTableState());
  }
}
