import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { RegistroserviceService, Student } from '../../services/registroservice.service';
import { RegistroTeacherserviceService, Teacher } from '../../services/registro-teacherservice.service';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  formularioRegistro: FormGroup;
  newStudent: Student = <Student>{};
  newTeacher: Teacher = <Teacher>{};
  student: boolean = true;

  constructor(
    public modalCtrl: ModalController,
    private registroService: RegistroserviceService,
    private registroTeacherservice: RegistroTeacherserviceService,
    private alertController: AlertController,
    private toastController: ToastController,
    private fb: FormBuilder
  ) {
    this.formularioRegistro = this.fb.group({
      'name' : new FormControl("", Validators.required),
      'email' : new FormControl("", Validators.required),
      'pass' : new FormControl("", Validators.required),
      'repass' : new FormControl("", Validators.required),
    });
  }
  
  ngOnInit() {
  }

  async dismiss() {
    return await this.modalCtrl.dismiss();
  }

  //  PARTE DE CREACIÓN
  async Create(){
    var form = this.formularioRegistro.value;
    if (this.formularioRegistro.invalid){
      console.log("ERROR.")
      this.alertError();
    } else {
      if (this.student == true){
        this.newStudent.stName = form.name,
        this.newStudent.stEmail = form.email,
        this.newStudent.stPass = form.pass,
        this.newStudent.stRepass = form.repass
        this.registroService.addDatos(this.newStudent).then(dato => {
          this.newStudent = <Student>{};
          this.showToast('¡Datos Agregados!');
        });
        console.log("ESTUDIANTE AGREGADO.")
      } else {
        this.newTeacher.teName = form.name,
        this.newTeacher.teEmail = form.email,
        this.newTeacher.tePass = form.pass,
        this.newTeacher.teRepass = form.repass
        this.registroTeacherservice.addDatos(this.newTeacher).then(dato => {
          this.newTeacher = <Teacher>{};
          this.showToast('¡Datos Agregados!');
        });
        console.log("PROFESOR AGREGADO.")
      }
    }
  }

  
  // PARTE GENERAL
  async alertError(){
    const alert = await this.alertController.create({
      header: 'Datos incompletos.',
      message: 'Debe completar todos los datos',
      buttons: ['Aceptar'],
    });

    await alert.present();
    return;
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      cssClass: 'toast-css'
    });
    await toast.present();
  }

  type(p){
    this.student = p;
    console.log("student : ", this.student);
  }
}