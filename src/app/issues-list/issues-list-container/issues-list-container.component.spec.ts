import { IssuesListContainerComponent } from './issues-list-container.component';
import { of, Observable, combineLatest } from 'rxjs';
import { ITableState, IIssue } from '@model';
import { IssuesFacade } from '../issues-facade/issues.facade';

class MockIssuesFacade {
  get tableState$(): Observable<ITableState> {
    return of(null);
  }

  get errorMessage$(): Observable<{ message: string }> {
    return of(null);
  }

  getTableHeaders(): { value: string; sortProp: string; label: string }[] {
    return [];
  }

  getIssues(): Observable<IIssue[]> {
    return of(null);
  }

  handleFileUpload(file: File) {}

  handleSortPropChanged(prop: string) {}

  handleTablePageChanged(page: number) {}
}

describe('IssuesListContainerComponent [u]', () => {
  let component: IssuesListContainerComponent;
  let mockIssuesFacade: any;

  beforeEach(() => {
    mockIssuesFacade = (new MockIssuesFacade() as unknown) as IssuesFacade;
    component = new IssuesListContainerComponent(mockIssuesFacade);
    component.ngOnInit();
  });

  it('should initiate observables correctly', (done) => {
    // arrange, act
    combineLatest([
      component.issues$,
      component.tableState$,
      component.error$,
    ]).subscribe(([issues, state, error]) => {
      // assert
      expect(issues).toBeNull();
      expect(state).toBeNull();
      expect(error).toBeNull();
      expect(component.tableHeaders.length).toEqual(0);

      done();
    });
  });

  it('should expose handlers to pass events to the facade', () => {
    // arrange
    spyOn(mockIssuesFacade, 'handleFileUpload');
    spyOn(mockIssuesFacade, 'handleSortPropChanged');
    spyOn(mockIssuesFacade, 'handleTablePageChanged');

    // act
    component.fileChanged({ file: null });
    component.tablePageChanged({ page: null });
    component.sortPropChanged({ prop: null });

    // assert
    expect(mockIssuesFacade.handleFileUpload).toHaveBeenCalledTimes(1);
    expect(mockIssuesFacade.handleSortPropChanged).toHaveBeenCalledTimes(1);
    expect(mockIssuesFacade.handleTablePageChanged).toHaveBeenCalledTimes(1);
  });
});
