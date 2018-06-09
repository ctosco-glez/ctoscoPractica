import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

import { MenuPage } from '../menu/menu';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  data:any = {};
  public id:string = '';


  

  constructor(public navCtrl: NavController, public http: Http) {
  	this.data.userlabel = '';
  	this.data.passlabel = '';

 	this.data.r_status = '';
 	this.data.r_id = '';
 
  }


  submit() {
	 var link = 'http://dev.contanimacion.com/birds/public/login/';
	 var myData = JSON.stringify({user: this.data.userlabel, password: this.data.passlabel});
	 
	 this.http.post(link, myData, { headers: { 'Content-Type': 'application/json' }} )
	 .subscribe(data => {
	 	
		data = data.json();

		this.id = data["id"];

		console.log("Peticion login: " + this.id);

		// Ir a pág menú
		if (this.id != ''){
			this.navCtrl.push(MenuPage, {
      			idUser: this.id,
    		});
		}

	 }, error => {
	 	console.log("Credenciales incorrectas");
	 });
  }

}
