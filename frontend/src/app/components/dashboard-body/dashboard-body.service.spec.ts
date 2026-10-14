import { TestBed } from '@angular/core/testing';

import { DashboardBodyService } from './dashboard-body.service';

describe('DashboardService', () => {
  let service: DashboardBodyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardBodyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
