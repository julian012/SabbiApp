import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ClientDetailComponent} from './client-detail/client-detail.component';
import { IonicModule } from '@ionic/angular';

import { ClientPage } from './client.page';
import {AddClientFormComponent} from './addclient/add-client-form.component';
import {ReportPage} from '../report/report.page';

const routes: Routes = [
  {
    path: '',
    component: ClientPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
  declarations: [ClientPage, ClientDetailComponent, AddClientFormComponent],
  entryComponents: [
      ClientDetailComponent, AddClientFormComponent
  ]
})
export class ClientPageModule {}
