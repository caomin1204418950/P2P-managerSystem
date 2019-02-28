import { TestBed, inject } from '@angular/core/testing';

import { DateTransformService } from './date-transform.service';

describe('DateTransformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateTransformService]
    });
  });

  it('should be created', inject([DateTransformService], (service: DateTransformService) => {
    expect(service).toBeTruthy();
  }));
});
