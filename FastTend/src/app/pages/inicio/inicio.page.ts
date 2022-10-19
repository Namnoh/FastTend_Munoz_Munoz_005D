import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  type: string = ' ';
  

  constructor() {
  }

  ngOnInit() {
    
  }

  msg() {
    console.log('ENTRASTE A INICIO');
  }

  ionViewWillEnter() {
    if (localStorage.getItem('type') == 'student') {
      this.type = 'student';
    }
    else {
      this.type = 'teacher';
    }
    console.log(this.type);
  }

  mostrarMenu(){
    console.log('EJECUCIÓN FUNCIÓN DESDE EL HOME');
  }
}
