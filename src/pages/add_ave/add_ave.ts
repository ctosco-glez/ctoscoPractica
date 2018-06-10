import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';

import { ListadoAvesPage } from '../listado_aves/listado_aves';


@Component({
  selector: 'page-addave',
  templateUrl: 'add_ave.html'
})
export class AddAvePage {

  data:any = {};
  myForm: FormGroup;

  lat: any = 0;
  long: any = 0;

  contrario: boolean;
  idUser: string;

  addAvis: boolean;
  localizacionPermitida: boolean = false;




  constructor(public navCtrl: NavController, public http: Http, public fb: FormBuilder, public navParams: NavParams, public toastCtrl: ToastController, public geolocation: Geolocation) {
  	// Obtener id user
  	this.idUser = navParams.get("idUser");

  	// Obtener localizacion
  	this.geolocation = geolocation;
  	this.obtenerLocalizacion();

  	this.myForm = this.fb.group({
      nombrelabel: ['', [Validators.required]],
      descripcionlabel: ['', [Validators.required, Validators.minLength(20)]],
      checklabel: [''],
      lugarlabel: [''],
    });
 
 	this.addAvis = true;
  }


  addAve() {
  	var link = 'http://dev.contanimacion.com/birds/public/addBird/';
  	var myData;

  	if (this.addAvis) {

  		if(this.localizacionPermitida){
  			myData = JSON.stringify({idUser: this.idUser, bird_name: this.data.nombrelabel, bird_description: this.data.descripcionlabel, place: this.data.lugarlabel, long: this.long, lat: this.lat});
  		}
  		else { // No tenemos localización
  			myData = JSON.stringify({idUser: this.idUser, bird_name: this.data.nombrelabel, bird_description: this.data.descripcionlabel, place: this.data.lugarlabel, long: '0', lat: '0'});
  		}
  		
  	} else {
  		myData = JSON.stringify({idUser: this.idUser, bird_name: this.data.nombrelabel, bird_description: this.data.descripcionlabel});
  	}

  	console.log("mostrando: " + myData);

  	this.http.post(link, myData, {headers: {'Content-Type' : 'application/json'}})
	 .subscribe(data => {

	 	data = data.json();
		
		if (data.status == "OK") {
			console.log("Se ha insertado una nueva ave");

			let toast = this.toastCtrl.create({
		      message: 'Nueva ave añadida correctamente',
		      duration: 3000,
		      position: 'top',
		      dismissOnPageChange: false
		    });

			toast.present(toast);

		 	// Si se inserta correctamente
	  		this.navCtrl.push(ListadoAvesPage, {
	      		idUser: this.idUser,
	    	});
		}
		else {
			console.log("No se ha insertado el ave");
		}

		console.log("Peticion add bird: " + data.status);

	 }, error => {
	 	console.log("No se ha podido insertar el ave");
	 });

  }


  obtenerLocalizacion() {

	  this.geolocation.getCurrentPosition().then((resp) => {

			this.lat = resp.coords.latitude;
			this.long = resp.coords.longitude;

			console.log("latitud: " + this.lat);
			console.log("longitud: " + this.long);

			this.localizacionPermitida = true;

			console.log("localizacion permitida: " + this.localizacionPermitida);

	  }).catch((error) => {
			console.log('Error getting location', error);
			this.localizacionPermitida = false;

	  });

  }



  actualizarCheck() {
  	console.log('Cucumbers new state:' + this.addAvis);
  	this.contrario = !this.addAvis;

  }

}