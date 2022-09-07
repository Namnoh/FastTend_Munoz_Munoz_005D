import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  // FUNCIÓN MENÚ
  mostrarMenu(){
    console.log('EJECUCIÓN FUNCIÓN DESDE EL HOME');
  }

  // ALERT
  async qrManual() {
    const alert = await this.alertController.create({
      header: 'Ingrese los dígitos del código QR.',
      buttons: ['Enviar'],
      inputs: [
        {
          placeholder: 'Ingrese el código.',
          attributes: {
            maxlength: 8,
          },
        }
      ],
    });

    await alert.present();
  }

}
