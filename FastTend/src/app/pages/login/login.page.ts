import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {ForgotPage} from '../forgot/forgot.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public modalCtrl: ModalController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async forget(){
    const modal = await this.modalCtrl.create({
      component: ForgotPage,
      animated: true,
      mode: 'ios',
      backdropDismiss: false,
      cssClass: 'forgot-modal',
    })

    return await modal.present();
  }

  onSubmit(){
    console.log('Submit');
  }
}
