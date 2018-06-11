import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { AddAvistamientoPage } from '../add_avistamiento/add_avistamiento';

@Component({
  selector: 'page-detalleave',
  templateUrl: 'detalle_ave.html'
})
export class DetalleAvePage {

  todo:any = {};
  idAve: string;

  imagen: string;
  nombre: string;
  mine: number;
  descripcion: string;

  avistamientos: any[];

  


  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, public loadingCtrl: LoadingController) {
  	
 	this.idAve = navParams.get("idAve");

  	console.log("idAve ver detalle: " + this.idAve);

  	let loader = this.loadingCtrl.create({
  	content: 'Obteniendo listado de aves...',
      dismissOnPageChange: false
  	});
  	loader.present();

  	this.getDetalleAve().then((x) => {
        if (x) loader.dismiss();
    }); 
  }



  getDetalleAve() {
  	return new Promise((resolve) => {
  		var link = 'http://dev.contanimacion.com/birds/public/getBirdDetails/' + this.idAve;
	 
	 	this.http.get(link, {headers: {'Content-Type' : 'application/json'}})
	 	.subscribe(data => { 

			console.log("Peticion detalle antes: " + data["_body"]);

			this.imagen = data[0]["bird_image"];
			this.nombre = data[0]["bird_name"];
			this.mine = data[0]["bird_sightings"];
			this.descripcion = data[0]["bird_description"];

			this.avistamientos = data[0]["sightings_list"];

		}, error => {
	 		console.log("No ha sido posible obtener los datos del ave seleccionada.");
		});
  		resolve(true);
  	})
  }



  irAddAvistamiento() {
  	console.log("id ave para enviar:" + this.idAve);
  	this.navCtrl.push(AddAvistamientoPage, {
      			idAve: this.idAve,
    		});
  }

}