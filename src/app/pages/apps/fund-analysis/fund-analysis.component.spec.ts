import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundAnalysisComponent } from './fund-analysis.component';

describe('FundAnalysisComponent', () => {
  let component: FundAnalysisComponent;
  let fixture: ComponentFixture<FundAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
