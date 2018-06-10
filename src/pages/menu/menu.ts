import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { ListadoAvesPage } from '../listado_aves/listado_aves';
import { AddAvePage } from '../add_ave/add_ave';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  data:any = {};

  params: Object;
  idUser: string;

  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams){

    this.idUser = navParams.get("idUser");

  }

  cerrarSesion() {
    this.navCtrl.setRoot(LoginPage);
  }

  irListadoAves() {
  	this.navCtrl.push(ListadoAvesPage, {
      			idUser: this.idUser,
    		});
  }


  irAddAve() {
  	this.navCtrl.push(AddAvePage, {
      			idUser: this.idUser,
    		});
  }

}