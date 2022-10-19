import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Teacher{
  teName: string;
  teEmail: string;
  tePass: string;
  teRepass: string;
}

const TEACHER_KEY = 'my-teachers';

@Injectable({
  providedIn: 'root'
})

export class RegistroTeacherserviceService {
  
  //Private de Teacher
  private _storage: Storage;
  newTeacher: Teacher = <Teacher>{};
  
  constructor(private storage: Storage) {
    this.init();
  }

  // Creamos el Storage de Profesores
  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async addDatos(dato: Teacher):Promise<any>{
    return this.storage.get(TEACHER_KEY).then((datos : Teacher[])=>{
      if (datos){
        datos.push(dato);
        return this.storage.set(TEACHER_KEY, datos);
      } else {
        return this.storage.set(TEACHER_KEY, [dato]);
      }
    })
  }

  async getTeachers():Promise<Teacher[]>{
    return this.storage.get(TEACHER_KEY);
  }
}