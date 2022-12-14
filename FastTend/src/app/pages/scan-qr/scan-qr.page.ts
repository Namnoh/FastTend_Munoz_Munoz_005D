import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { DatosApiService } from '../../services/datos-api.service';
import { IStudent } from '../../interfaces/idato';
import { SAsistenciaService, sAsist } from '../../services/s-asistencia.service';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})

export class ScanQrPage implements OnInit {

  scannedCode: null | string;
  sAsist : sAsist;
  datos =  JSON.parse(localStorage.getItem('data'))
  student : IStudent = {
    stName : this.datos[1],
    stEmail : this.datos[0]
  }

  constructor(private alertController: AlertController, private barcodeScanner: BarcodeScanner, private datosApi: DatosApiService, private sAsistencia: SAsistenciaService) { }

  ngOnInit() {
  }

  // FUNCIÓN MENÚ
  mostrarMenu(){
    console.log('EJECUCIÓN FUNCIÓN DESDE EL HOME');
  }

  async scanCode() {
    await this.barcodeScanner.scan().then(barcodeData =>{
      this.datosApi.crearEstudiante(this.student).subscribe();
      this.scannedCode = barcodeData.text;
      const data = JSON.parse(this.scannedCode);
      this.sAsist = {
        sig : data[0],
        nombre : data[1],
        seccion : data[2],
        fecha : data[3],
        horaInicio : data[4],
        horaFinal : data[5]
      }
      this.sAsistencia.addDatos(this.sAsist);
    });
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
