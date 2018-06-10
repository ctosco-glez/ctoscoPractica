import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'page-addave',
  templateUrl: 'add_ave.html'
})
export class AddAvePage {

  data:any = {};
  myForm: FormGroup;

  contrario: boolean;

  addAvis: boolean;

  constructor(public navCtrl: NavController, public http: Http, public fb: FormBuilder) {
  	this.myForm = this.fb.group({
      nombrelabel: ['', [Validators.required]],
      descripcionlabel: ['', [Validators.required, Validators.minLength(20)]],
      checklabel: [''],
      lugarlabel: [''],
    });
 
 	this.addAvis = true;
  }


  addAve() {


  }


  actualizarCheck() {
  	console.log('Cucumbers new state:' + this.addAvis);
  	this.contrario = !this.addAvis;
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