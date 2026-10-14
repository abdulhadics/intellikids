import { TestBed } from '@angular/core/testing';

import { ContentPopulateService } from './content-populate.service';

describe('ContentPopulateService', () => {
  let service: ContentPopulateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentPopulateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
