import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ForgotPage } from '../forgot/forgot.page';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { RegistroTeacherserviceService, Teacher } from '../../services/registro-teacherservice.service';
import { RegistroserviceService, Student } from '../../services/registroservice.service';
import { FormGroup,
         FormControl,
         Validators,
         FormBuilder
        } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin : FormGroup;
  teachers : Teacher[];
  students : Student[];
  msg: string;
  student: boolean = false;
  teacher: boolean = false;

  constructor(
    public modalCtrl: ModalController,
    private toastController: ToastController,
    private alertController: AlertController,
    private NavController: NavController,
    private registroService: RegistroTeacherserviceService,
    private registroStudent: RegistroserviceService,
    private fb: FormBuilder
  )
  {
    this.formularioLogin = this.fb.group({
      'correo' : new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  async Ingresar() {
    var f = this.formularioLogin.value;
    var a = false;
    

    // INGRESO PROFESOR
    this.registroService.getTeachers().then(datos=>{
      this.teachers = datos;
      if(!datos || datos.length==0){
        this.teacher = true;
        console.log('BASE DE DATOS PROFESOR INEXISTENTE O VACIA: ', datos);
      } else {
        for (let obj of this.teachers){
          if (obj.teEmail == f.correo && obj.tePass == f.password){
            a = true;
            console.log('Ingresado como Profesor');
            localStorage.setItem('ingresado', 'true');
            localStorage.setItem('profile', obj.teEmail);
            const data = [obj.teEmail, obj.teName, obj.tePass];
            localStorage.setItem('data', JSON.stringify(data));
            localStorage.setItem('type', 'teacher');
            this.dismiss();
            this.msg = `¡ Bienvenido  ${obj.teName} !`;
            this.showToast(this.msg);
            this.NavController.navigateRoot('inicio');
          }
        }
      }
      if(a == false){
        console.log("NO INGRESADO COMO PROFESOR");
        // INGRESO ALUMNO
        this.registroStudent.getStudents().then(data=>{
          this.students = data;
          if(!data || data.length==0){
            console.log('BASE DE DATOS ALUMNOS INEXISTENTE O VACIA: ', datos);
          } else {
            for (let obj of this.students){
              if (obj.stEmail == f.correo && obj.stPass == f.password){
                a = true;
                console.log('Ingresado como Alumno');
                localStorage.setItem('ingresado', 'true');
                localStorage.setItem('profile', obj.stEmail);
                const data = [obj.stEmail, obj.stName, obj.stPass];
                localStorage.setItem('data', JSON.stringify(data));
                localStorage.setItem('type', 'student');
                this.dismiss();
                this.msg = `¡ Bienvenido  ${obj.stName} !`;
                this.showToast(this.msg);
                this.NavController.navigateRoot('inicio');
              }
            }
          }
          if (a == false){
            this.dbMsg();
          }
        });
      }
    });
    
  }

  // MENSAJE DATOS ERRONEOS
  async alertMsg(){
    const alert = await this.alertController.create({
      header: 'Error...',
      message: '¡Los datos ingresados no son correctos!',
      buttons: ['Aceptar'],
    });
    await alert.present();
    return;
  }

  // MENSAJE SIN BASE DE DATOS
  async dbMsg(){
    const alert = await this.alertController.create({
      header: 'Error...',
      message: '¡Los datos ingresados no existen!',
      buttons: ['Aceptar'],
    });
    await alert.present();
    return;
  }

  // MENSAJE INICIO DE SESIÓN
  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top',
      cssClass: 'toast-css'
    });
    await toast.present();
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
}
