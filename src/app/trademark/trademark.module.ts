import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {IonicModule} from '@ionic/angular';

import {TrademarkPage} from './trademark.page';

const routes: Routes = [
    {
        path: '',
        component: TrademarkPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [TrademarkPage]
})
export class TrademarkPageModule {
}
