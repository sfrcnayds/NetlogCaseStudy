import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FundAnalysisComponent} from './fund-analysis.component';
import {FundAnalysisRoutingModule} from './fund-analysis-routing.module';
import {FundFormComponent} from './fund-form/fund-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule} from '@angular/material/button';
import {FundChartComponent} from './fund-chart/fund-chart.component';
import {FundTableComponent} from './fund-table/fund-table.component';
import {DataTablesModule} from 'angular-datatables';
import {FusionChartsModule} from 'angular-fusioncharts';

// Import FusionCharts library and chart modules
import * as FusionCharts from 'fusioncharts';
import * as charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';


FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);

@NgModule({
    declarations: [FundAnalysisComponent, FundFormComponent, FundChartComponent, FundTableComponent],
    imports: [
        CommonModule,
        FundAnalysisRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMomentDateModule,
        MatButtonModule,
        DataTablesModule,
        FusionChartsModule
    ]
})
export class FundAnalysisModule {
}
