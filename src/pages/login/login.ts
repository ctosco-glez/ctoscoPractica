import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { MenuPage } from '../menu/menu';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  data:any = {};
  public id:string = '';
  myLogin: FormGroup;


  

  constructor(public navCtrl: NavController, public http: HttpClient, public fb: FormBuilder) {
  	this.data.userlabel = '';
  	this.data.passlabel = '';

 	this.data.r_status = '';
 	this.data.r_id = '';
 
 	this.myLogin = this.fb.group({
      userlabel: ['', [Validators.required]],
      passlabel: ['', [Validators.required]],
    });
  }


  submit() {
	 var link = 'http://dev.contanimacion.com/birds/public/login/';
	 var myData = JSON.stringify({user: this.data.userlabel, password: this.data.passlabel});
	 
	 this.http.post(link, myData, { headers: { 'Content-Type': 'application/json' }} )
	 .subscribe(data => {

		this.id = data["id"];

		console.log("Id: " + this.id);

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
