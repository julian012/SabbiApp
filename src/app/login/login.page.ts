import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {LoginServiceService} from './login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  nickname: string;
  password: string;

  constructor(
      private loginService: LoginServiceService,
      private router: Router,
      private alertCtrtl: AlertController ) { }

  ngOnInit() {
  }

  login() {

    this.loginService.login(this.nickname, this.password).subscribe(res  => {
      console.log(res.login);
      if (res.login) {
        this.router.navigate(['home']);
      } else {
        this.wrongMessage();
      }
    }, (err: any) => {
      this.wrongMessage();
    });
  }

  async wrongMessage() {
    const alert = await this.alertCtrtl.create({
      header: 'Mensaje',
      subHeader: 'Iniciar Sesión',
      message: 'Contraseña Incorrecta, velifique los datos ingresados.',
      buttons: ['OK']
    });
    await alert.present();
  }

}
