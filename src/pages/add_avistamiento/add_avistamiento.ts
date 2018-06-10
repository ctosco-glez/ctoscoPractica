import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { DetalleAvePage } from '../detalle_ave/detalle_ave';


@Component({
  selector: 'page-addavistamiento',
  templateUrl: 'add_avistamiento.html'
})
export class AddAvistamientoPage {

  data:any = {};
  addAvistamientoForm: FormGroup;

  lat: any = 0;
  long: any = 0;

  idAve: string;

  localizacionPermitida: boolean = false;


  constructor(public navCtrl: NavController, public http: Http, public geolocation: Geolocation, public fb: FormBuilder, public navParams: NavParams, public toastCtrl: ToastController) {

  	// Obtener id ave
  	this.idAve = navParams.get("idAve");

  	this.geolocation = geolocation;
  	this.obtenerLocalizacion();

  	this.addAvistamientoForm = this.fb.group({
      lugarlabel: ['', [Validators.required]],
    });
 
  }



  obtenerLocalizacion() {

	  this.geolocation.getCurrentPosition().then((resp) => {

			this.lat = resp.coords.latitude;
			this.long = resp.coords.longitude;

			console.log("latitud: " + this.lat);
			console.log("longitud: " + this.long);

			this.localizacionPermitida = true;


	  }).catch((error) => {
			console.log('Error getting location', error);
			this.localizacionPermitida = false;

	  });

  }


  addAvistamiento() {
  	 
	var link = 'http://dev.contanimacion.com/birds/public/addSighting/';
	 var myData = JSON.stringify({idAve: this.idAve, place: this.data.lugarlabel, long: this.long, lat: this.lat});
	 
	 this.http.post(link, myData, {headers: {'Content-Type' : 'application/json'}})
	 .subscribe(data => {

	 	data = data.json();

	 	this.data.r_status = data["status"]; 

	 	console.log("respuesta insertar avistamiento: " + data["status"]);

	 	if (this.data.r_status == "OK") {

		    let toast = this.toastCtrl.create({
		      message: 'Avistamiento añadido correctamente',
		      duration: 3000,
		      position: 'bottom'
		    });

			toast.present(toast);

		 	// Si se inserta correctamente
	  		this.navCtrl.push(DetalleAvePage, {
	      		idAve: this.idAve,
	    	});

    	}

	 }, error => {
	 	console.log("No se ha podido insertar avistamiento");
	 });
  }


}