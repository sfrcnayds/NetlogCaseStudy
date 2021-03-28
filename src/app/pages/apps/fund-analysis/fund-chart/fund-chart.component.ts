import {Component, OnInit} from '@angular/core';
import {FundFormService} from '../services/fund-form.service';
import {fundDataColumns} from '../../../../static-data/fund-data-columns';
import {FundDataResponse} from '../../../../api-services/interfaces/fund-data-response';
import {DatePipe} from '@angular/common';


const chartDefault = {
    chart: {
        caption: 'Fon Detay Analizi',
        showhovereffect: '1',
        numbersuffix: '%',
        drawcrossline: '1',
        theme: 'fusion'
    }
};

@Component({
    selector: 'fund-chart',
    templateUrl: './fund-chart.component.html',
    styleUrls: ['./fund-chart.component.scss'],
    providers: [DatePipe]
})
export class FundChartComponent implements OnInit {
    dataColumns: string[] = fundDataColumns;
    dataSource: any = chartDefault;

    constructor(private fundFormService: FundFormService, private datePipe: DatePipe) {
    }

    ngOnInit(): void {

        this.fundFormService.currentData.subscribe((data) => {
            if (data) {
                this.dataSource = {
                    chart: {
                        caption: 'Fon Detay Analizi',
                        subcaption: data[0].FonKodu,
                        showhovereffect: '1',
                        numbersuffix: '%',
                        drawcrossline: '1',
                        theme: 'fusion'
                    },
                    categories: [
                        {
                            category: data.map((data) => {
                                return {
                                    label: this.datePipe.transform(data.Tarih, 'dd.MM.YYYY')
                                };
                            })
                        }
                    ],
                    dataset: this.setDataForDataset(data)
                };

            } else {
                this.dataSource = chartDefault;
            }
        });
    }

    private setDataForDataset(fundData: FundDataResponse[]) {
        const dataset = [];
        this.dataColumns.forEach((column) => {
            let total = 0;

            fundData.forEach((data) => {
                total += data[column];
            });

            const avg = total / fundData.length;

            const data = {
                seriesname: column,
                data: fundData.map((data) => {
                    return {
                        value: (avg === 0) ? 0 : (avg - data[column]) / avg
                    };
                })
            };
            if (total !== 0) {
                dataset.push(data);
            }
        });
        return dataset;
    }
}
