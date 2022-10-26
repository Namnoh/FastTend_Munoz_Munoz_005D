import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit {

  scannedCode: string;

  constructor(private alertController: AlertController, private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
  }

  // FUNCIÓN MENÚ
  mostrarMenu(){
    console.log('EJECUCIÓN FUNCIÓN DESDE EL HOME');
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData =>{
      this.scannedCode = barcodeData.text;
    })
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
            maxlength: 12,
          },
        }
      ],
    });

    await alert.present();
  }

}
