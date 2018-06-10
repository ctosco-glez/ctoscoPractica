import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

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

  


  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams) {
  	
 	this.idAve = navParams.get("idAve");

  	console.log("idAve ver detalle: " + this.idAve);

  	this.solicitarDetalleAve();
  }


  solicitarDetalleAve() {
	 var link = 'http://dev.contanimacion.com/birds/public/getBirdDetails/' + this.idAve;
	 
	 this.http.get(link, {headers: {'Content-Type' : 'application/json'}})
	 .subscribe(data => { 

		console.log("Peticion detalle antes: " + data["_body"]);
	 	data = data.json();

		this.imagen = data[0]["bird_image"];
		this.nombre = data[0]["bird_name"];
		this.mine = data[0]["bird_sightings"];
		this.descripcion = data[0]["bird_description"];


	 }, error => {
	 	console.log("No ha sido posible obtener los datos del ave seleccionada.");
	 });
  }


  irAddAvistamiento() {
  	this.navCtrl.push(AddAvistamientoPage);
  }

}