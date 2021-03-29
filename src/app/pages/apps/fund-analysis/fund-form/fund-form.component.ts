import {Component, OnInit} from '@angular/core';
import {fundTypes, FundTypeSelect} from '../../../../static-data/fund-types';
import {MatSelectChange} from '@angular/material/select';
import {FundAnalysisService} from '../../../../api-services/fund-analysis.service';
import {FundCodeResponse} from '../../../../api-services/interfaces/fund-code-response';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter,} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {periodTypes, PeriodTypeSelect} from '../../../../static-data/period-types';
import {FundFormService} from '../services/fund-form.service';
import {FundDataResponse} from '../../../../api-services/interfaces/fund-data-response';

@Component({
    selector: 'filter-form',
    templateUrl: './fund-form.component.html',
    styleUrls: ['./fund-form.component.scss'],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'tr-TR'},
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
    ]
})
export class FundFormComponent implements OnInit {

    fundTypesOptions: Array<FundTypeSelect>;
    fundCodesOptions: Array<FundCodeResponse>;
    periodOptions: Array<PeriodTypeSelect>;

    filteredFundCodesOptions: Observable<FundCodeResponse[]>;

    minDate: Date;
    maxDate: Date;

    filterForm = new FormGroup({
        fundType: new FormControl('', [Validators.required]),
        fundCode: new FormControl('', [Validators.required]),
        start: new FormControl('', [Validators.required]),
        end: new FormControl('', [Validators.required]),
        period: new FormControl('', [Validators.required])
    });

    constructor(private fundAnalysisService: FundAnalysisService,
                private fundFormService: FundFormService) {
    }

    ngOnInit(): void {
        this.fundTypesOptions = fundTypes;
        this.fundCodesOptions = [];
        this.periodOptions = periodTypes;

        this.filteredFundCodesOptions = this.filterForm.get('fundCode').valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );

        this.minDate = new Date(2021, 0, 1);
        this.maxDate = new Date();
    }

    onFundTypeSelect(event: MatSelectChange) {
        this.fundAnalysisService.getFundCodes(event.value).subscribe((response) => {
            this.fundCodesOptions = response;
            this.filterForm.get('fundCode').setValue('');
        });
    }

    submitDetails(event: Event) {
        const startDate = this._formatDateForApi(this.filterForm.value.start.toDate());
        const endDate = this._formatDateForApi(this.filterForm.value.end.toDate());

        const fundCode = this.filterForm.value.fundCode;
        const fundType = this.filterForm.value.fundType;

        const periodType = this.filterForm.value.period;

        this.fundAnalysisService.getFundData(fundCode, fundType, startDate, endDate).subscribe((response) => {
            const dataResponse: FundDataResponse = {
                period: periodType,
                data: response
            };
            this.fundFormService.changeData(dataResponse);
        });
    }

    private _filter(value: string): FundCodeResponse[] {
        const filterValue = value.toLowerCase();
        return this.fundCodesOptions.filter(option => (option.Adi.toLowerCase().indexOf(filterValue) === 0
            || option.Kodu.toLowerCase().indexOf(filterValue) === 0));
    }

    private _formatDateForApi(date: Date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }
}
