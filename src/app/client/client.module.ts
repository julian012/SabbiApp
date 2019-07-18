import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ClientDetailComponent} from './client-detail/client-detail.component';
import { IonicModule } from '@ionic/angular';

import { ClientPage } from './client.page';

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
  declarations: [ClientPage, ClientDetailComponent],
  entryComponents: [
      ClientDetailComponent
  ]
})
export class ClientPageModule {}
