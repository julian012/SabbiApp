import { Component, OnInit } from '@angular/core';
import {ActionSheetController, AlertController, ToastController} from '@ionic/angular';
import {PlatformModel} from '../models/Platform.model';
import {PlatformsService} from './platforms.service';
import {OK} from '../models/httpStatus';
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
  public result;

  constructor(
      private dataPlatformService : PlatformsService,
      public alertCtrl: AlertController,
      public loadingController: LoadingController,
      private actionSheetCtrl: ActionSheetController
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
        (error: any) => {this.dataPlatform = new Array<PlatformModel>();
        this.result = error.message;}
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
      this.dataPlatformService.createPlatform(platform).subscribe( res =>{
        console.log(res);
        this.loadPlatforms();
        this.showMessage('Mensaje', 'Agregando plataforma', 'Plataforma agregada correctamente');
      }, (error) =>{
        this.wrongMessage();
      });
    }
  }

  async savePlatformLoading() {
    let loading = await this.loadingController.create({
      message: 'Procesando',
      duration: 2000
    });
    await loading.present();
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
            this.savePlatformLoading();

          }
        }
      ]
    });
    await prompt.present();
  }

  async changeNamePlatform(platform : PlatformModel) {
    let prompt = await this.alertCtrl.create({
      header: 'Modificar Plataforma',
      message: "Ingrese el nombre de la plataforma. Tenga en cuenta que si el nombre cambia, se va a ver reflejado tambien en los reportes",
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
          text: 'Modificar',
          handler: data => {
            platform.name_platform = data.title;
            this.dataPlatformService.updatePlatform(platform).subscribe( (res) => {
              this.savePlatformLoading();
              this.showMessage('Mensaje','Modificar plataforma','Nombre de la plataforma modificada correctamente');
            }, (error) => {
              this.savePlatformLoading();
              this.showMessage('Mensaje','Modificar plataforma','Nombre de la plataforma no se pudo modificar. Verifique que no se repite con ya alguno guardado');
            });
          }
        }
      ]
    });
    await prompt.present();
  }

  async showMessage(header, subHeader, message){
    let alert = await this.alertCtrl.create({
      header,
      subHeader,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async wrongMessage() {
    let alert = await this.alertCtrl.create({
      header: 'Mensaje',
      subHeader: 'Agregando plataforma',
      message: 'La plataforma no se pudo agregar, debido a que el nombre de la plataforma ya existe.',
      buttons: ['OK']
    });
    await alert.present();
  }

  public changeStatusPlatform(platform : PlatformModel){
    console.log("Cambio " + platform.name_platform + " con estado " + platform.status_platform);
    this.dataPlatformService.updatePlatform(platform).subscribe( res =>{
      console.log(res);
    });
  }

  public generatePath(name : string){
    //return this.dataPlatformService.validateUrlImagePlatform(name);
    return "https://logo.clearbit.com/" + name + ".com";
    /*https://ui-avatars.com/api/?name=MercadoLibre Api para en caso de no encontrar la imagen*/
  }

  public generatePathAlternative(name : string){
     console.log("https://ui-avatars.com/api/?name=" + name);
    return "https://ui-avatars.com/api/?name=" + name ;
  }

  async deletePlatform(platform : PlatformModel){
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: `¿Seguro desea eliminar la plataforma ${platform.name_platform}?`,
      cssClass: 'options-as-platforms',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

        }, {
          text: 'Continuar',
          handler: () => {
            this.dataPlatformService.deletePlatform(platform).subscribe( res =>{
              this.showMessage('Mensaje','Eliminando plataforma', 'Plataforma eliminada correctamente');
              this.savePlatformLoading();
              this.loadPlatforms();
            }, (error) => {
              this.showMessage('Error', 'Eliminando plataforma','No se puede eliminar la plataforma, debido a que ya fue asignada a una venta. En tal caso de no usarla más, la puede desactivar')
            });;
          }
        }
      ]
    });

    await alert.present();
  
  }

  async optionsInPlatforms(platform : PlatformModel) {
     const actionSheet = await this.actionSheetCtrl.create({
      header: platform.name_platform,
      buttons: [{
        text: 'Eliminar',
        icon: 'close-circle',
        cssClass: 'danger',
        handler: () => {
          this.deletePlatform(platform);
        }
      }, {
        text: 'Cambiar nombre',
        icon: 'build',
        handler: () => {
          this.changeNamePlatform(platform);
        }
      }, {
        text: 'Cancelar',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
    
}
}

//(ionError)="[src] = generatePathAlternative(platform.name_platform)"
