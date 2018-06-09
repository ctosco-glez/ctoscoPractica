import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from '@angular/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { AddAvePage } from '../pages/add_ave/add_ave';
import { AddAvistamientoPage } from '../pages/add_avistamiento/add_avistamiento';
import { DetalleAvePage } from '../pages/detalle_ave/detalle_ave';
import { ListadoAvesPage } from '../pages/listado_aves/listado_aves';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MenuPage,
    AddAvePage,
    AddAvistamientoPage,
    DetalleAvePage,
    ListadoAvesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MenuPage,
    AddAvePage,
    AddAvistamientoPage,
    DetalleAvePage,
    ListadoAvesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
