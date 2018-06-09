import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { DetalleAvePage } from '../detalle_ave/detalle_ave';

@Component({
  selector: 'page-listadoaves',
  templateUrl: 'listado_aves.html'
})
export class ListadoAvesPage {

  data:any = {};
  idUser: string;
  aves: any[];


  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams) {
  	
  	this.idUser = navParams.get("idUser");

  	console.log("idUser listado: " + this.idUser);

  	this.solicitarListadoAves();
 
  }


  solicitarListadoAves() {

  	var link = 'http://dev.contanimacion.com/birds/public/getBirds/' + this.idUser;
	 
	 this.http.get(link, {headers: {'Content-Type' : 'application/json'}})
	 .subscribe(data => {
	 	
	 	this.data.r_status = data["status"];

	 	data = data.json();
	 	this.aves = data;

	 }, error => {
	 	console.log("No se han podido obtener aves");
	 });
  }


  verDetalle(idAve: string) {
  	console.log("Has tocado: " + idAve);

  	this.navCtrl.push(DetalleAvePage, {
      			idAve: idAve,
    		});
  }


}