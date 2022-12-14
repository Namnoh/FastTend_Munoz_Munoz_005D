import { Component, OnInit } from '@angular/core';
import { RegistroTeacherserviceService, Teacher } from '../../services/registro-teacherservice.service';
import { RegistroserviceService, Student } from '../../services/registroservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  type: string;
  correo: string | null;

  students : Student[];
  teachers : Teacher[];

  isShowing: boolean = true;

  constructor(private registroTeacher: RegistroTeacherserviceService, private registroStudent: RegistroserviceService) {
    this.init();
  }

  ngOnInit() {
    if (localStorage.getItem('profile') != null) {
      this.correo = localStorage.getItem('profile');
      console.log(this.correo)
    }
  }

  usuario={
    name:'',
    email:'',
    pass:''
  }

  // FUNCIÓN PARA OBTENER LA INFORAMCIÓN DEL USUARIO
  init () {
    const account = JSON.parse(localStorage.getItem('data')!);
    this.usuario.email = account[0];
    this.usuario.name = account[1];
    this.usuario.pass = account[2];
    // if (this.type == 'student'){
    //   this.registroStudent.getStudents().then(datos=>{
    //     this.students = datos;
    //     for (let obj of this.students){
    //       if (obj.stEmail == localStorage.getItem('profile')){
    //         this.usuario.name = obj.stName;
    //         this.usuario.email = obj.stEmail;
    //         this.usuario.pass = obj.stPass;
    //       }
    //     }
    //   });
    // } else {
    //   this.registroTeacher.getTeachers().then(datos=>{
    //     this.teachers = datos;
    //     for (let obj of this.teachers){
    //       if (obj.teEmail == localStorage.getItem('profile')){
    //         this.usuario.name = obj.teName;
    //         this.usuario.email = obj.teEmail;
    //         this.usuario.pass = obj.tePass;
    //       }
    //     }
    //   });
    // }
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

  // FUNCIÓN PARA SABER EL TYPE
  ionViewWillEnter() {
    // if (localStorage.getItem('type') == 'student') {
    //   this.type = 'student';
    // }
    // else {
    //   this.type = 'teacher';
    // }
    // console.log(this.type);
  }
}