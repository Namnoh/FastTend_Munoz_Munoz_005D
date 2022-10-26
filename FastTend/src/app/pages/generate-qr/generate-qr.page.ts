import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.page.html',
  styleUrls: ['./generate-qr.page.scss'],
})

export class GenerateQrPage implements OnInit {

  isGenerated: boolean = false;
  qrData = null;
  createdCode = null;

  constructor() { }

  ngOnInit() {
  }

  // FUNCIÓN MENÚ
  mostrarMenu(){
    console.log('EJECUCIÓN FUNCIÓN DESDE EL HOME');
  }

  generateCode(){
    this.createdCode = this.qrData;
  }

  // Generate(){
  //   if (this.isGenerated){
  //     this.isGenerated= false;
  //     console.log('Cerrando')
  //   }
  //   else{
  //     this.isGenerated= true;
  //     console.log('Generando');
  //   }
  // }

}
