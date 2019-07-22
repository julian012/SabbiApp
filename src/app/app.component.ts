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
      icon: 'home'
    },
    {
      title: 'Productos',
      url: '/products',
      icon: 'logo-buffer'
    },
    {
      title: 'Marcas',
      url: '/trademark',
      icon: 'pricetag'
    }, {
      title: 'Prendas',
      url: '/garment',
      icon: 'shirt'
    }, {
      title: 'Clientes',
      url: '/client',
      icon: 'people'
    }, {
      title: 'Ventas',
      url: '/sales',
      icon: 'cash'
    }, {
      title: 'Reportes',
      url: '/reports',
      icon: 'stats'
    }, {
      title: 'Plataformas',
      url: '/platforms',
      icon: 'basket'
    }, {
      title: 'Configuración',
      url: '/settings',
      icon: 'settings'
    }, {
      title: 'Simular compra',
      url: '/simulate',
      icon: 'alert'
    }, {
      title: 'Cerrar Sesión',
      url: '/list',
      icon: 'exit'
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
