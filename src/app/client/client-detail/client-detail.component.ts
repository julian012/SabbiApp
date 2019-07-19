import { Component, OnInit } from '@angular/core';
import {ClientModel} from '../../models/Client.model';
import {PhoneModel} from '../../models/Phone.model';
import { ClientDetailService } from './client-detail.service';
import {SaleModel} from '../../models/Sale.model';
import {AlertController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators, AbstractControl, FormControl} from '@angular/forms';
import {ERRORMESSAGES} from '../../models/httpStatus';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent implements OnInit {

  public MESSAGE_CONFIRM_EDIT = '¿Seguro desea modificar la información del cliente?';
  public MESSAGE_CONFIRM_COMEBACK = '¿Desea volver sin guardar cambios?';
  public dataClient: ClientModel;
  public dataClientChanges: ClientModel;
  public phoneClient: PhoneModel[];
  public phoneClientChanges: PhoneModel[];
  public salesClient: SaleModel[];
  public edit = false;
  public myForm: FormGroup;
  public deletePhoneList: PhoneModel[];
  public errorMessages = ERRORMESSAGES;
  public first_name: AbstractControl;
  public last_name: AbstractControl;
  public document_user: AbstractControl;

  constructor(private dataClientService: ClientDetailService,
              public alertCtrl: AlertController,
              public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setPhoneClient();
    this.getClientSales();
  }

  public getDate(date: string) {
    const newDate = new Date(date);
    return `${newDate.getDay()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
  }

  public setPhoneClient() {
    this.dataClientService.getPhoneNumber(this.dataClient.id_user).subscribe(res => {
          this.phoneClient = res;
        },
        (error: any) => {
        });
  }

  public getClientSales() {
    this.dataClientService.getSales(this.dataClient.id_user).subscribe(res => {
          this.salesClient = res;
        },
        (error: any) => {
        });
  }

  public getColorHeader(color: string) {
    return '#' + color;
  }

  public getAge(date: string, ageSave: number, create: string) {
    const today = new Date();
    if (date) {
      const birthDate = new Date(date);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
      }
      return age;
    } else {
      const createDate = new Date(create);
      return ageSave + (today.getFullYear() - createDate.getFullYear());
    }
  }

  public getIconClient(client: ClientModel) {
    return this.dataClientService.getIconClient(client);
  }

  public existPhone() {
    return this.phoneClient.length > 0;
  }

  public loadEditClient() {
    this.edit = !this.edit;
    if (this.edit) {
      this.loadForm();
    }
  }

  public loadForm() {
    this.dataClientChanges = this.dataClient;
    this.phoneClientChanges = this.phoneClient;
    this.deletePhoneList = [];
    console.log('Datos copiados', this.dataClientChanges);
    this.createMyForm();
  }

  async editClient(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message,
      cssClass: 'options-as-platforms',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Continuar',
          handler: () => {
            this.loadEditClient();
          }
        }
      ]
    });

    await alert.present();

  }

  public createMyForm() {
    this.myForm = this.formBuilder.group({
      document_user : new FormControl(this.dataClientChanges.document_user, Validators.compose([
        Validators.required,
        Validators.max(99999999999),
        Validators.min(10000000)
      ])),
      first_name : new FormControl(this.dataClientChanges.first_name, Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'),
          Validators.maxLength(25)
          ])),
      last_name : new FormControl(this.dataClientChanges.last_name, Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'),
        Validators.maxLength(25)
      ])),
      email_cuser : new FormControl(this.dataClientChanges.email_cuser, Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      birthdate_user : new FormControl(this.getDateISOFormat(), Validators.minLength(7)),
      age_user : new FormControl(this.dataClientChanges.age_user, Validators.compose([
        Validators.min(15),
          Validators.max(90)
      ])),
      gender_user : new FormControl(this.dataClientChanges.gender_user, Validators.required)
    });
  }

  public getDateISOFormat() {
    const date = new Date(this.dataClientChanges.birthdate_user);
    return date.getDay() + '-' + date.getMonth() + '-' + date.getFullYear();
  }

  public addPhone() {
    this.phoneClientChanges.push( new PhoneModel());
  }

  public deletePhone(phone: PhoneModel) {
    for (let i = 0; i < this.phoneClientChanges.length ; i++) {
      if (this.phoneClientChanges[i].number_phone === phone.number_phone) {
        this.deletePhoneList.push(phone);
        this.phoneClientChanges.splice(i, 1);
      }
    }
  }

}
