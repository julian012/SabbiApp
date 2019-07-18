import {FormBuilder, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {ClientModel} from './Client.model';

export class ClientValidator {

  constructor(
      public navCtrl: NavController,
      public formBuilder: FormBuilder ) {
  }

  public createMyForm(client: ClientModel) {
      return this.formBuilder.group({
          document_user : [client.document_user, Validators.compose([
              Validators.required,
              Validators.maxLength(11),
              Validators.minLength(8)
          ])],
          first_name : [client.first_name, Validators.required],
          last_name : [client.last_name, Validators.required],
          email_user : [client.email_cuser, Validators.compose([
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
          ])],
          age_user : [client.age_user, Validators.minLength(15)],
          birth_date : [client.birthdate_user, Validators.minLength(7)],
          gender_user : [client.gender_user, Validators.required]
      });
  }
}
