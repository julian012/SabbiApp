import {Component, Input, OnInit} from '@angular/core';
import {ClientModel} from '../../models/Client.model';
import {PhoneModel} from '../../models/Phone.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ERRORMESSAGES} from '../../models/httpStatus';
import {AlertController} from '@ionic/angular';
import {ClientPage} from '../client.page';

@Component({
  selector: 'app-addclient',
  templateUrl: './add-client-form.component.html',
  styleUrls: ['./add-client-form.component.scss'],
})

export class AddClientFormComponent implements OnInit {

  public MESSAGE_CONFIRM_ADD = '¿Desea continuar?';
  public phoneNumberList: PhoneModel[] = [];
  public myForm: FormGroup;
  public errorMessages = ERRORMESSAGES;

  @Input() clientPage: ClientPage;

  constructor(private formBuilder: FormBuilder,
              public alertCtrl: AlertController) {
    this.addPhone();
    this.createMyForm();
  }

  ngOnInit() {}

  public deletePhone(phone: PhoneModel) {
    for (let i = 0; i < this.phoneNumberList.length ; i++) {
      if (this.phoneNumberList[i].number_phone === phone.number_phone) {
        this.phoneNumberList.splice(i, 1);
      }
    }
  }

  public existPhone() {
    return this.phoneNumberList.length > 0;
  }

  public createMyForm() {
    this.myForm = this.formBuilder.group({
      document_user : new FormControl('', Validators.compose([
        Validators.required,
        Validators.max(99999999999),
        Validators.min(10000000)
      ])),
      first_name : new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'),
        Validators.maxLength(25)
      ])),
      last_name : new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'),
        Validators.maxLength(25)
      ])),
      email_cuser : new FormControl('', Validators.email),
      birthdate_user : new FormControl('', Validators.minLength(7)),
      age_user : new FormControl('', Validators.compose([
        Validators.min(15),
        Validators.max(90)
      ])),
      gender_user : new FormControl('M', Validators.required)
    });
  }

  async confirmChange(message: string) {
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
            this.saveClient();
          }
        }
      ]
    });
    await alert.present();
  }

  public saveClient() {
    this.clientPage.saveClient(this.myForm, this.phoneNumberList);
  }

  public addPhone() {
    this.phoneNumberList.push( new PhoneModel());
  }

}
