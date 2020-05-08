import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesUploadComponent } from './issues-upload.component';

describe('IssuesUploadComponent', () => {
  let component: IssuesUploadComponent;
  let fixture: ComponentFixture<IssuesUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
