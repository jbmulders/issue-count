import { IssuesService, ESortDirection } from './issues.service';
import { ITableState, IIssue } from '@model';

const mockFileContent = `h1;h2;h3;h4
test;test;test;test
test;test;test;test
test;test;test;test
test;test;test;test
`;
const mockError = 'test';

describe('IssuesService [u]', () => {
  let service: IssuesService;

  beforeEach(() => {
    service = new IssuesService();
  });

  it('should set the correct defaults', (done) => {
    // arrange, act
    service.tableState$.subscribe((state: ITableState) => {
      // assert
      expect(state.page).toEqual(1);
      expect(state.totalPages).toEqual(1);
      expect(state.direction).toEqual(ESortDirection.asc);
      expect(state.orderBy).toEqual('lastName');
      done();
    });
  });

  it('should notify the issues subject when `changeIssues` is called', (done) => {
    // arrange
    service.changeIssues(mockFileContent);
    service.issues$.subscribe((issues: IIssue[]) => {
      // assert
      expect(issues.length).toEqual(4);
      expect(issues[0].firstName).toEqual('test');

      done();
    });
  });

  it('should notufy tableState subject when `changeIssues` is called with valid data', (done) => {
    // arrange
    service.changeIssues(mockFileContent);
    service.tableState$.subscribe((state: ITableState) => {
      // assert

      expect(state.page).toEqual(1);
      expect(state.totalPages).toEqual(1);
      expect(state.direction).toEqual(ESortDirection.asc);
      expect(state.orderBy).toEqual('lastName');
      expect(state.totalItems).toEqual(4);

      done();
    });
  });

  it('should call `handleError` if `changeIssues` called with invalid data', () => {
    // arrange
    spyOn(service, 'handleError');

    // act
    service.changeIssues('');

    // assert
    expect(service.handleError).toHaveBeenCalledTimes(1);
  });

  it('should update tableState when `changeSortProp` is called', (done) => {
    // arrange
    service.changeSortProp('test');
    service.tableState$.subscribe((state: ITableState) => {
      // assert
      expect(state.orderBy).toEqual('test');

      done();
    });
  });

  it('should update tableState when `changeSortProp` is called with the same prop twice', (done) => {
    // arrange
    service.changeSortProp('test');
    service.changeSortProp('test');
    service.tableState$.subscribe((state: ITableState) => {
      // assert
      expect(state.direction).toEqual(ESortDirection.dsc);

      done();
    });
  });

  it('should update tableState when `changePageSize` is called with valid size number', (done) => {
    // arrange
    service.changePageSize(2);
    service.tableState$.subscribe((state: ITableState) => {
      // assert
      expect(state.pageSize).toEqual(2);

      done();
    });
  });

  it('should not update tableState when `changePageSize` is called with invalid size number', (done) => {
    // arrange
    service.changePageSize(0);
    service.tableState$.subscribe((state: ITableState) => {
      // assert
      expect(state.pageSize).toEqual(10);

      done();
    });
  });

  it('should update tableState when `changePage` is called with valid page number', (done) => {
    // arrange
    service.changeIssues(mockFileContent);
    service.changePageSize(2);
    service.changePage(2);
    service.tableState$.subscribe((state: ITableState) => {
      // assert
      expect(state.page).toEqual(2);

      done();
    });
  });

  it('should not update tableState when `changePage` is called with invalid page number', (done) => {
    // arrange
    service.changePage(2);
    service.tableState$.subscribe((state: ITableState) => {
      // assert
      expect(state.page).toEqual(1);

      done();
    });
  });

  it('should call `handleError` if `changeIssues` called with invalid data', () => {
    // arrange
    spyOn(service, 'handleError');

    // act
    service.changeIssues('');

    // assert
    expect(service.handleError).toHaveBeenCalledTimes(1);
  });

  it('should notify the error subject when `handleError` is called', (done) => {
    // arrange
    service.handleError(mockError);
    service.error$.subscribe((error: { message: string }) => {
      // assert
      expect(error.message).toEqual('test');

      done();
    });
  });
});
