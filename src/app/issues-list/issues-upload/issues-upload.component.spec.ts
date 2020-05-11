import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesUploadComponent } from './issues-upload.component';

describe('IssuesUploadComponent [i]', () => {
  let component: IssuesUploadComponent;
  let fixture: ComponentFixture<IssuesUploadComponent>;

  const testFile = new File(['test'], 'test.csv', {
    type: 'text/csv',
  });
  const testEvent = { target: { files: [testFile] } };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssuesUploadComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the selected file', () => {
    // arrange
    spyOn(component.fileChange, 'emit');

    // act
    component.fileSelected(testEvent);

    // assert
    expect(component.fileChange.emit).toHaveBeenCalledWith({ file: testFile });
  });
});
