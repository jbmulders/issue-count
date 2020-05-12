import { IssuesFacade } from './issues.facade';
import { IssuesService } from '../issues-service/issues.service';
import { of, Observable, combineLatest } from 'rxjs';
import { IIssue, ITableState } from '@model';
import { fakeAsync, tick } from '@angular/core/testing';

class MockIssuesService {
  get issues$(): Observable<IIssue[]> {
    return of([]);
  }
  get tableState$(): Observable<ITableState> {
    return of({} as ITableState);
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

class MockFileReader {
  constructor() {}

  onload = (event: any) => {};
  onerror = (event: any) => {};

  readAsText(inputText: string) {
    this.onload({ target: { result: inputText } });
  }
}

const mockFile = new File(['test'], 'test.csv', {
  type: 'text/csv',
});
const mockInvalidFile = new File(['test'], 'test.csv', {
  type: 'text/txt',
});

describe('IssuesFacadeService [u]', () => {
  let facade: IssuesFacade;
  let mockIssuesService: any;

  beforeEach(() => {
    mockIssuesService = (new MockIssuesService() as unknown) as IssuesService;
    facade = new IssuesFacade(mockIssuesService);
  });

  it('should expose observables to pass data to container(s)', (done) => {
    // arrange, act
    combineLatest([
      facade.getIssues(),
      facade.tableState$,
      facade.errorMessage$,
    ]).subscribe(([issues, state, error]) => {
      // assert
      expect(issues).toEqual([]);
      expect(state).toEqual({} as ITableState);
      expect(error).toBeNull();

      done();
    });
  });

  it('should expose handlers to pass events to service if data is valid', () => {
    // arrange
    spyOn(window as any, 'FileReader').and.returnValue(new MockFileReader());
    spyOn(mockIssuesService, 'changeIssues');
    spyOn(mockIssuesService, 'changeSortProp');
    spyOn(mockIssuesService, 'changePage');

    // act
    facade.handleFileUpload(mockFile);
    facade.handleSortPropChanged('test');
    facade.handleTablePageChanged(1);

    // assert
    expect(mockIssuesService.changeIssues).toHaveBeenCalledTimes(1);
    expect(mockIssuesService.changeSortProp).toHaveBeenCalledTimes(1);
    expect(mockIssuesService.changePage).toHaveBeenCalledTimes(1);
  });

  it('should handle invalid files by calling `isseusServic.handleError`', () => {
    // arrange
    spyOn(window as any, 'FileReader').and.returnValue(new MockFileReader());
    spyOn(mockIssuesService, 'handleError');

    // act
    facade.handleFileUpload(null);
    facade.handleFileUpload(mockInvalidFile);

    // assert
    expect(mockIssuesService.handleError).toHaveBeenCalledTimes(2);
  });
});
