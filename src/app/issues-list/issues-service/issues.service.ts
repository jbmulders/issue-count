import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IIssue, EIssueProps } from 'app/model/issue';
import { ITabelState } from 'app/model/tabel-state';

export enum ESortDirection {
  asc = 'asc',
  dsc = 'dsc',
}

@Injectable()
export class IssuesService {
  private issues: IIssue[];
  private issuesSubject: BehaviorSubject<IIssue[]>;
  private tableStateSubject: BehaviorSubject<ITabelState>;
  private errorSubject: BehaviorSubject<{ message: string }>;

  // table state
  private sortProp: string;
  private sortDirection: string; // asc or desc
  private tablePage: number;
  private tableTotalPages: number;
  public readonly tablePageSize = 10;

  get issues$(): Observable<IIssue[]> {
    return this.issuesSubject.asObservable();
  }
  get tableState$(): Observable<ITabelState> {
    return this.tableStateSubject.asObservable();
  }
  get error$(): Observable<{ message: string }> {
    return this.errorSubject.asObservable();
  }

  constructor() {
    // default table state
    this.sortProp = EIssueProps.lastName;
    this.sortDirection = ESortDirection.asc;
    this.tablePage = 1;
    this.tableTotalPages = 1;

    this.issues = [];

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

    this.tablePage = 1;
    this.tableTotalPages = Math.ceil(this.issues.length / this.tablePageSize);

    this.notify();
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

  private getTableState(): ITabelState {
    return {
      page: this.tablePage,
      totalPages: this.tableTotalPages,
      orderBy: this.sortProp,
      direction: this.sortDirection,
    };
  }

  private notify() {
    this.issuesSubject.next(this.issues);
    this.tableStateSubject.next(this.getTableState());
  }
}
