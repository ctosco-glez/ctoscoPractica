import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'page-addavistamiento',
  templateUrl: 'add_avistamiento.html'
})
export class AddAvistamientoPage {

  data:any = {};
  addAvistamientoForm: FormGroup;

  lat: any = 0;
  long: any = 0;

  localizacionPermitida: boolean = true;


  constructor(public navCtrl: NavController, public http: Http, public geolocation: Geolocation, public fb: FormBuilder) {

  	this.geolocation = geolocation;

  	this.addAvistamientoForm = this.fb.group({
      lugarlabel: ['', [Validators.required]],
    });

    this.obtenerLocalizacion();
  	
 
  }



  obtenerLocalizacion() {
  
	  this.geolocation.getCurrentPosition().then((resp) => {
		    console.log("latitud: " + resp.coords.latitude);
			console.log("longitud: " + resp.coords.longitude);
	  }).catch((error) => {
			console.log('Error getting location', error);
			this.localizacionPermitida = false;
	  });

  }


  addAvistamiento() {

  }



/*
  submit() {
	 var link = 'http://dev.contanimacion.com/birds/public/login/';
	 var myData = JSON.stringify({user: this.data.userlabel, password: this.data.passlabel});
	 
	 this.http.post(link, myData, {headers: {'Content-Type' : 'application/json'}})
	 .subscribe(data => {
	 	
	 	this.data.r_status = data["status"]; 
	 	this.data.r_id = data["id"]; 
		
		console.log("Peticion login: " + data);

	 	console.log("Id: " + data + this.data.r_id);

	 }, error => {
	 	console.log("Credenciales incorrectas");
	 });
  }*/

}