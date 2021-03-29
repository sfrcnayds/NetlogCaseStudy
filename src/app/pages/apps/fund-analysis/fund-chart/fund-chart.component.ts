import {Component, OnInit} from '@angular/core';
import {FundFormService} from '../services/fund-form.service';
import {fundDataColumns} from '../../../../static-data/fund-data-columns';
import {DatePipe} from '@angular/common';
import {FundDataResponse} from '../../../../api-services/interfaces/fund-data-response';
import {Period} from '../../../../static-data/period-types';


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

        this.fundFormService.currentData.subscribe((response) => {
            if (response?.data) {
                const customData = this.setDataForDataset(response);
                console.log(customData);
                this.dataSource = {
                    chart: {
                        caption: 'Fon Detay Analizi',
                        subcaption: response.data[0].FonKodu,
                        showhovereffect: '1',
                        numbersuffix: '%',
                        drawcrossline: '1',
                        theme: 'fusion'
                    },
                    categories: [
                        {
                            category: customData.category
                        }
                    ],
                    dataset: customData.dataset
                };

            } else {
                this.dataSource = chartDefault;
            }
        });
    }

    private setDataForDataset(response: FundDataResponse) {
        let fundData = response.data;
        const dataset = [];
        let category = [];
        if (response.period === Period.Weekly || response.period === Period.Monthly) {
            let index = 0;
            let groupArray = [];
            let tempArray = [];
            const dayCount = response.period === Period.Weekly ? 7 : 30;
            fundData.forEach((data) => {
                tempArray.push(data);
                index = index + 1;
                if (index === dayCount) {
                    index = 0;
                    groupArray.push(tempArray);
                    tempArray = [];
                }
            });
            if (tempArray.length !== 0) {
                groupArray.push(tempArray);
            }

            let data = [];
            groupArray.forEach((group) => {
                const groupData = {};
                const startDate = this.datePipe.transform(group[0].Tarih, 'dd.MM.YYYY');
                const endDate = this.datePipe.transform(group[group.length - 1].Tarih, 'dd.MM.YYYY');
                groupData['Tarih'] = `${startDate} - ${endDate}`;
                this.dataColumns.forEach((column) => {
                    let total = 0;

                    group.forEach((data) => {
                        total += data[column];
                    });
                    const avg = total / group.length;
                    groupData[column] = avg;
                });
                data.push(groupData);
            });
            fundData = data;
        }
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

        category = fundData.map((data) => {
            let dateString = data.Tarih;
            if (response.period === Period.Daily) {
                dateString = this.datePipe.transform(dateString, 'dd.MM.YYYY');
            }
            return {
                label: dateString
            };
        });

        const returnResponse = {
            category: category,
            dataset: dataset
        };
        return returnResponse;
    }
}
