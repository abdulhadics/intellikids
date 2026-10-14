import { TestBed } from '@angular/core/testing';

import { DashboardCoursesService } from './dashboard-courses.service';

describe('DashboardCoursesService', () => {
  let service: DashboardCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
