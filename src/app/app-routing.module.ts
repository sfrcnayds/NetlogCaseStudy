import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomLayoutComponent} from './custom-layout/custom-layout.component';

const routes: Routes = [
    {
        path: '',
        component: CustomLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/apps/fund-analysis/fund-analysis.module').then(m => m.FundAnalysisModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        // preloadingStrategy: PreloadAllModules,
        scrollPositionRestoration: 'enabled',
        relativeLinkResolution: 'corrected',
        anchorScrolling: 'enabled'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
