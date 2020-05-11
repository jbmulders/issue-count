import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesTableComponent } from './issues-table.component';
import { IIssue } from '@model';
import { By } from '@angular/platform-browser';

const mockIssue: IIssue = {
  firstName: 'test',
  lastName: 'test',
  issueCount: 1,
  dateOfBirth: 'test',
  dateOfBirth_date: new Date(),
};

describe('IssuesTableComponent [i]', () => {
  let component: IssuesTableComponent;
  let fixture: ComponentFixture<IssuesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssuesTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesTableComponent);
    component = fixture.componentInstance;
    component.tableState = {
      page: 1,
      totalPages: 1,
      totalItems: 0,
      orderBy: 'lastName',
      pageSize: 10,
      direction: 'asc',
    };
    component.tableHeaders = [
      { value: 'firstName', sortProp: 'firstName', label: 'First Name' },
      { value: 'lastName', sortProp: 'lastName', label: 'Last Name' },
    ];
    component.issues = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide the table when issue array is empty', () => {
    // arrange, act
    const table = fixture.debugElement.query(By.css('table'));
    const tableActions = fixture.debugElement.query(By.css('#tableactions'));
    const tablePage = fixture.debugElement.query(By.css('#tablepageinfo'));

    // assert
    expect(table).toBeFalsy();
    expect(tableActions).toBeFalsy();
    expect(tablePage).toBeFalsy();
  });

  it('should show the table when issue array has items', () => {
    // arrange
    component.issues = [mockIssue, mockIssue, mockIssue];
    component.tableState = {
      ...component.tableState,
      totalItems: component.issues.length,
    };

    // act
    fixture.detectChanges();
    const table = fixture.debugElement.query(By.css('table'));
    const tableActions = fixture.debugElement.query(By.css('#tableactions'));
    const tablePage = fixture.debugElement.query(By.css('#tablepageinfo'));

    // assert
    expect(table).toBeTruthy();
    expect(tableActions).toBeTruthy();
    expect(tablePage).toBeTruthy();
  });

  it('should disable next page button when on last page', () => {
    // arrange
    component.issues = [mockIssue, mockIssue, mockIssue];
    component.tableState = {
      ...component.tableState,
      totalItems: component.issues.length,
    };

    // act
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('#btnnextpage'));

    // assert
    expect(btn.nativeElement.disabled).toBeTrue();
  });

  it('should enable next page button when not on last page', () => {
    // arrange
    component.issues = [mockIssue, mockIssue, mockIssue];
    component.tableState = {
      ...component.tableState,
      totalItems: component.issues.length,
      totalPages: 2,
      pageSize: 2,
      page: 1,
    };

    // act
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('#btnnextpage'));

    // assert
    expect(btn.nativeElement.disabled).toBeFalse();
  });

  it('should disable prev page / reset page button when on first page', () => {
    // arrange
    component.issues = [mockIssue, mockIssue, mockIssue];
    component.tableState = {
      ...component.tableState,
      totalItems: component.issues.length,
      totalPages: 2,
      pageSize: 2,
    };

    // act
    fixture.detectChanges();
    const btnPrev = fixture.debugElement.query(By.css('#btnprevpage'));
    const btnReset = fixture.debugElement.query(By.css('#btnprevpage'));

    // assert
    expect(btnPrev.nativeElement.disabled).toBeTrue();
    expect(btnReset.nativeElement.disabled).toBeTrue();
  });

  it('should enable prev page / reset page button when not on first page', () => {
    // arrange
    component.issues = [mockIssue, mockIssue, mockIssue];
    component.tableState = {
      ...component.tableState,
      totalItems: component.issues.length,
      page: 2,
      totalPages: 2,
      pageSize: 2,
    };

    // act
    fixture.detectChanges();
    const btnPrev = fixture.debugElement.query(By.css('#btnprevpage'));
    const btnReset = fixture.debugElement.query(By.css('#btnprevpage'));

    // assert
    expect(btnPrev.nativeElement.disabled).toBeFalse();
    expect(btnReset.nativeElement.disabled).toBeFalse();
  });

  it('should show table page info when issue array has items', () => {
    // arrange
    component.issues = [mockIssue, mockIssue, mockIssue];
    component.tableState = {
      ...component.tableState,
      totalItems: component.issues.length,
    };

    // act
    fixture.detectChanges();
    const table = fixture.debugElement.query(By.css('table'));

    // assert
    expect(table).toBeTruthy();
  });

  it('should emit when `headerClicked` is called', () => {
    // arrange
    component.issues = [mockIssue, mockIssue, mockIssue];
    component.tableState = {
      ...component.tableState,
      totalItems: component.issues.length,
    };
    spyOn(component.sortPropChange, 'emit');
    fixture.detectChanges();

    // act
    const th = fixture.debugElement.query(By.css('th'));
    th.nativeElement.click();

    // assert
    expect(component.sortPropChange.emit).toHaveBeenCalledWith({
      prop: component.tableHeaders[0].sortProp,
    });
  });

  it('should emit when `setPage` is called when `next page` button is clicked', () => {
    // arrange
    component.issues = [mockIssue, mockIssue, mockIssue, mockIssue];
    component.tableState = {
      ...component.tableState,
      totalItems: component.issues.length,
      totalPages: 2,
    };
    spyOn(component.pageChange, 'emit');
    fixture.detectChanges();

    // act
    const btn = fixture.debugElement.query(By.css('#btnnextpage'));
    btn.nativeElement.click();

    // assert
    expect(component.pageChange.emit).toHaveBeenCalledWith({
      page: component.tableState.page + 1,
    });
  });

  it('should emit when `setPage` is called when `prev page` button is clicked', () => {
    // arrange
    component.issues = [mockIssue, mockIssue, mockIssue, mockIssue];
    component.tableState = {
      ...component.tableState,
      page: 2,
      totalItems: component.issues.length,
      totalPages: 2,
    };
    spyOn(component.pageChange, 'emit');
    fixture.detectChanges();

    // act
    const btn = fixture.debugElement.query(By.css('#btnprevpage'));
    btn.nativeElement.click();

    // assert
    expect(component.pageChange.emit).toHaveBeenCalledWith({
      page: component.tableState.page - 1,
    });
  });

  it('should emit when `setPage` is called when `reset page` button is clicked', () => {
    // arrange
    component.issues = [mockIssue, mockIssue, mockIssue, mockIssue];
    component.tableState = {
      ...component.tableState,
      page: 2,
      totalItems: component.issues.length,
      totalPages: 2,
    };
    spyOn(component.pageChange, 'emit');
    fixture.detectChanges();

    // act
    const btn = fixture.debugElement.query(By.css('#btnpagereset'));
    btn.nativeElement.click();

    // assert
    expect(component.pageChange.emit).toHaveBeenCalledWith({
      page: 1,
    });
  });
});
