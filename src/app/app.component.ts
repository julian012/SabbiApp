import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'md-home'
    },
    {
      title: 'Productos',
      url: '/home',
      icon: 'logo-buffer'
    },
    {
      title: 'Marcas',
      url: '/list',
      icon: 'md-pricetag'
    },{
      title: 'Prendas',
      url: '/list',
      icon: 'ios-shirt'
    },{
      title: 'Clientes',
      url: '/list',
      icon: 'md-people'
    },{
      title: 'Ventas',
      url: '/list',
      icon: 'md-cash'
    },{
      title: 'Reportes',
      url: '/list',
      icon: 'md-stats'
    },{
      title: 'Plataformas',
      url: '/platforms',
      icon: 'md-basket'
    },{
      title: 'Configuración',
      url: '/list',
      icon: 'md-settings'
    },{
      title: 'Cerrar Sesión',
      url: '/list',
      icon: 'md-exit'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
