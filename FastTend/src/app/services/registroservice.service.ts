import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Student{
  stName: string;
  stEmail: string;
  stPass: string;
  stRepass: string;
}

const STUDENTS_KEY = 'my-students';


@Injectable({
  providedIn: 'root'
})

export class RegistroserviceService {

  //Private de Student
  private _storage: Storage;
  newStudent: Student = <Student>{};
  

  
  constructor(private storage: Storage) {
    this.init();
  }

  // Creamos el Storage de Estudiantes
  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // AGREGAR ESTUDIANTES
  async addDatos(dato: Student):Promise<any>{
    return this.storage.get(STUDENTS_KEY).then((datos : Student[])=>{
      if (datos){
        datos.push(dato);
        return this.storage.set(STUDENTS_KEY, datos);
      } else {
        return this.storage.set(STUDENTS_KEY, [dato]);
      }
    })
  }

  // OBTENER ESTUDIANTES
  async getStudents():Promise<Student[]>{
    return this.storage.get(STUDENTS_KEY);
  }

  // ACTUALIZAR UN ESTUDIANTE

}