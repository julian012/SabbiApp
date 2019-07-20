import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import {ClientModel} from '../models/Client.model';
import { ModalController} from '@ionic/angular';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import {FormGroup} from '@angular/forms';
import {PhoneModel} from '../models/Phone.model';
import {compilePipeFromMetadata} from '@angular/compiler';
import {PlatformModel} from '../models/Platform.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})

export class ClientPage implements OnInit {
  public list: ClientModel[];
  public values = '';

  constructor( private dataClientService: ClientService,
               private modal: ModalController) {
    this.list = this.dataClientService.getClients();
  }

  ngOnInit() {}
  public filter(): void {
    this.list = this.dataClientService.filterClients(this.values);
    // TODO Pendiente colocar aviso si no encuenta
  }

  public getIcon(gender: string) {
    if (gender.toLowerCase() === 'm') {
      return 'man';
    } else {
      return 'woman';
    }
  }

  async openClientInfo(info: ClientModel) {
    const modal = await this.modal.create({
      component : ClientDetailComponent,
      componentProps : {
        dataClient : info,
        clientPage : this
      },
      cssClass : 'modalClientInfo'
    });
    await modal.present();
  }

  public getIconClient(client: ClientModel) {
    return this.dataClientService.getIconClient(client);
  }

  public closeModal(client: ClientModel, form: FormGroup, deleteList: PhoneModel[], list: PhoneModel[]) {
    console.log(form.value);
    client.age_user = form.value.age_user;
    const date =  new Date(form.value.birthdate_user);
    client.birthdate_user = date.toISOString();
    client.document_user = form.value.document_user;
    console.log('Direccion de correo que llego: ', form.value.email_cuser);
    client.email_cuser = form.value.email_cuser;
    client.first_name = form.value.first_name;
    client.last_name = form.value.last_name;
    client.gender_user = form.value.gender_user;
    setTimeout( () => {
      this.list.forEach( i => {
        if (i.id_user === client.id_user) {
          i = client;
          this.dataClientService.updateClient(i).subscribe(res => {
                console.log('Se actualizo correctamente');
              },
              (error: any) => {
              console.log(error.message);
              }
          );
        }
      });
      list.forEach( phone => {
        // SI EXISTIA SE IBA ERA A MODIFICAR
        if (phone.id_phone) {
          this.dataClientService.updatePhone(phone).subscribe( res => {
            console.log('Modificado correctamente');
          });
        } else { // En este caso se va a agregar
          this.dataClientService.addPhone(client.id_user, phone.number_phone + '').subscribe( res => {
            phone.id_phone = res.id_phone;
          });
        }
      });
      deleteList.forEach( phone => {
        if (phone.id_phone) {
          this.dataClientService.deletePhone(phone).subscribe( res => {
            console.log('Eliminado correctamente');
          });
        }
      });
    }, 2000);
    this.modal.dismiss();
  }
}
