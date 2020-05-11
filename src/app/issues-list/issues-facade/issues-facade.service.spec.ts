import { IssuesFacade } from './issues.facade';
import { IssuesService } from '../issues-service/issues.service';
import { of, Observable } from 'rxjs';
import { IIssue, ITableState } from '@model';

class MockIssuesService {
  get issues$(): Observable<IIssue[]> {
    return of(null);
  }
  get tableState$(): Observable<ITableState> {
    return of(null);
  }
  get error$(): Observable<{ message: string }> {
    return of(null);
  }

  constructor() {}

  changeIssues(fileContent: string) {}

  changeSortProp(prop: string) {}

  handleError(message: string) {}

  changePage(page: number) {}

  changePageSize(size: number) {}
}

describe('IssuesFacadeService', () => {
  let service: IssuesFacade;
  let issuesService: any;

  beforeEach(() => {
    issuesService = (new MockIssuesService() as unknown) as IssuesService;
    issuesService = service = new IssuesFacade(issuesService);
  });

  it('should expose observables to pass data to container(s)', () => {});

  it('should expose handlers to pass events to service', () => {});
});
