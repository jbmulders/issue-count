import { TestBed } from '@angular/core/testing';

import { IssuesFacade } from './issues-facade.service';

describe('IssuesFacadeService', () => {
  let service: IssuesFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssuesFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
