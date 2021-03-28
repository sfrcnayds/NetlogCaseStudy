import {VexRoute} from '../../../../@vex/interfaces/vex-route.interface';
import {FundAnalysisComponent} from './fund-analysis.component';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

const routes : Array<VexRoute> = [
    {
        path: '',
        component: FundAnalysisComponent,
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class FundAnalysisRoutingModule{

}
