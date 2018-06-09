import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-detalleave',
  templateUrl: 'detalle_ave.html'
})
export class DetalleAvePage {

  data:any = {};


  constructor(public navCtrl: NavController, public http: Http) {
  	
 
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