import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FundFormService} from '../services/fund-form.service';
import {Subject} from 'rxjs';
import {FundDataResponse} from '../../../../api-services/interfaces/fund-data-response';
import {DataTableDirective} from 'angular-datatables';
import {fundDataColumns} from '../../../../static-data/fund-data-columns';

@Component({
    selector: 'fund-table',
    templateUrl: './fund-table.component.html',
    styleUrls: ['./fund-table.component.scss']
})
export class FundTableComponent implements OnInit, AfterViewInit,OnDestroy {
    @ViewChild(DataTableDirective, {static : false}) dtElement: DataTableDirective;
    dtTrigger: Subject<any> = new Subject<any>();
    dtOptions: DataTables.Settings = {};

    dataColumns: string[] = fundDataColumns;

    data: Array<FundDataResponse> = [];

    constructor(private fundFormService: FundFormService) {
    }

    ngOnInit(): void {
        this.dtOptions = {
            scrollX: true,
            searching: false,
            pagingType: 'full_numbers'
        };
        this.fundFormService.currentData.subscribe((data) => {
            if (data) {
                this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                    dtInstance.destroy();
                    this.data = data;
                    this.dtTrigger.next();
                });
            }
        });
    }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }
}
