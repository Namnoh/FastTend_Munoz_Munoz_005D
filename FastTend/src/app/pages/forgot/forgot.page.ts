import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  constructor(
    public modalCtrl: ModalController,
    private alertController: AlertController,
  ) { }
  
  ngOnInit() {
  }

  async correo() {
    const alert = await this.alertController.create({
      header: 'Recuperación en Curso',
      subHeader: 'Correo con instrucciones enviadas',
      buttons: ['Gracias'],
    });
    await alert.present();
  } 

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

}
