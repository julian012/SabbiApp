import { Component, OnInit } from '@angular/core';
import {PlatformModel} from '../models/Platform.model';
import {PlatformsService} from './platforms.service';
import {OK} from '../models/httpStatus';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import {__await} from 'tslib';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.page.html',
  styleUrls: ['./platforms.page.scss'],
  providers: [PlatformsService]
})
export class PlatformsPage implements OnInit {

  public dataPlatform: Array<PlatformModel>;

  constructor(
      private dataPlatformService : PlatformsService,
      public alertCtrl: AlertController,
      public loadingController: LoadingController
  ) {
    this.dataPlatform= new Array<PlatformModel>();
  }

  ngOnInit() {
    this.loadPlatforms();
  }

  public loadPlatforms(): void{
    this.dataPlatformService.getDataPlatforms().subscribe(res =>{
      this.dataPlatform = res;
      console.log(this.dataPlatform);
    },
        (error: any) => this.dataPlatform = new Array<PlatformModel>()
    );
  }



  public createPlatform(data: string): void{
    let platform = new PlatformModel();
    platform.status_platform = true;
    platform.name_platform = data;
    platform.id_platform = -1;
    if(this.dataPlatform.find(x => x.name_platform.toUpperCase() == data.toUpperCase())){
      this.wrongMessage();
    }else{
      console.log("Llego");
      this.dataPlatformService.createPlatform(platform).subscribe( res =>{
        console.log(res);
        this.loadPlatforms();
        this.successfulMessage();
      });

    }

  }



  async savePlatformLoading() {
    let loading = await this.loadingController.create({
      message: 'Guardando',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');

  }

  async showPrompt() {
    let prompt = await this.alertCtrl.create({
      header: 'Agregar Plataforma',
      message: "Ingrese el nombre de la plataforma que desea agregrar",
      inputs: [
        {
          name: 'title',
          placeholder: 'Nombre'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.createPlatform(data.title);
            console.log('Saved clicked' + data.title);
            this.savePlatformLoading();

          }
        }
      ]
    });
    await prompt.present();
  }

  async successfulMessage() {
    let alert = await this.alertCtrl.create({
      header: 'Mensaje',
      subHeader: 'Agregando plataforma',
      message: 'Plataforma agregada correctamente.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async wrongMessage() {
    let alert = await this.alertCtrl.create({
      header: 'Mensaje',
      subHeader: 'Agregando plataforma',
      message: 'El nombre de la plataforma ya existe.',
      buttons: ['OK']
    });
    await alert.present();
  }

  public changeStatusPlatform(platform : PlatformModel){
    console.log("Cambio " + platform.name_platform + " con estado " + platform.status_platform);
    this.dataPlatformService.updatePlatform(platform).subscribe( res =>{
      console.log(res);
    });;
  }

  public generatePath(name : string){
    return "https://logo.clearbit.com/" + name + ".com";
    /*https://ui-avatars.com/api/?name=MercadoLibre Api para en caso de no encontrar la imagen*/
  }
}
