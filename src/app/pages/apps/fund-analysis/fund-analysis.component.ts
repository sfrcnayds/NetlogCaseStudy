import { Component, OnInit } from '@angular/core';
import {FundFormService} from './services/fund-form.service';

@Component({
  selector: 'vex-fund-analysis',
  templateUrl: './fund-analysis.component.html',
  styleUrls: ['./fund-analysis.component.scss']
})
export class FundAnalysisComponent implements OnInit {

  constructor(private filterFormService:FundFormService) { }

  ngOnInit(): void {

  }

}
