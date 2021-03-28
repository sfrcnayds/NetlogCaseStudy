import { TestBed } from '@angular/core/testing';

import { FundAnalysisService } from './fund-analysis.service';

describe('FundAnalysisService', () => {
  let service: FundAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
