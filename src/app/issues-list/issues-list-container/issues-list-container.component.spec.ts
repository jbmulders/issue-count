import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesListContainerComponent } from './issues-list-container.component';

describe('IssuesListContainerComponent', () => {
  let component: IssuesListContainerComponent;
  let fixture: ComponentFixture<IssuesListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
