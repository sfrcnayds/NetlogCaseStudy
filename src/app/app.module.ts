import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {VexModule} from '../@vex/vex.module';
import {HttpClientModule} from '@angular/common/http';
import {CustomLayoutModule} from './custom-layout/custom-layout.module';
import {DataTablesModule} from 'angular-datatables';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        DataTablesModule,
        // Vex
        VexModule,
        CustomLayoutModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
