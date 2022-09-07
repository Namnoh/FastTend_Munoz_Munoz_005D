import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  isShowing: boolean = true;

  constructor() {
    this.init();
  }

  ngOnInit() {
  }

  usuario={
    nombre:'',
    email:'',
    password:''
  }

  init () {
    this.usuario = {
      nombre: 'Alfredo David Galdames Sanhueza',
      email: 'al.galdames@duocuc.cl',
      password: 'alfredogaldames123456'
    };
  }

  // FUNCIÓN MENÚ
  mostrarMenu(){
    if (this.isShowing){
      this.isShowing= false;
      console.log('CERRANDO');
    }
    else{
      this.isShowing= true;
      console.log('MOSTRANDO');
    }
    console.log('EJECUCIÓN FUNCIÓN DESDE EL HOME');
  }

}
