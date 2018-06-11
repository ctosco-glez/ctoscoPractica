import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { DetalleAvePage } from '../detalle_ave/detalle_ave';
import { AddAvePage } from '../add_ave/add_ave';


@Component({
  selector: 'page-listadoaves',
  templateUrl: 'listado_aves.html'
})
export class ListadoAvesPage {

  data:any = {};
  idUser: string;
  aves;


  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, public loadingCtrl: LoadingController) {
  	
  	this.idUser = navParams.get("idUser");

  	console.log("idUser listado: " + this.idUser);

  	this.loadingCtrl = loadingCtrl;

  	let loader = this.loadingCtrl.create({
  	content: 'Obteniendo listado de aves...',
      dismissOnPageChange: false
  	});
  	loader.present();

  	this.getListaAves().then((x) => {
        if (x) loader.dismiss();
    }); 

  }


   getListaAves() {
	   	return new Promise((resolve) => {
		  	var link = 'http://dev.contanimacion.com/birds/public/getBirds/' + this.idUser;
			 this.http.get(link, {headers: {'Content-Type' : 'application/json'}})
			 .subscribe(data => {
			 	
			 	this.data.r_status = data["status"];

			 	this.aves = data;

			 	resolve(true);
			 }, error => {

			 	resolve(true);
			 	console.log("No se han podido obtener aves");
			});
	  	})
	}


  

  verDetalle(idAve: string) {
  	console.log("Has tocado: " + idAve);

  	this.navCtrl.push(DetalleAvePage, {
      			idAve: idAve,
    		});
  }



  irAddAve() {
  	this.navCtrl.push(AddAvePage, {
      			idUser: this.idUser,
    		});
  }


}