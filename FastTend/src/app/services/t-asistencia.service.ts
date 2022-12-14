import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface tAsist{
  siglas: string;
  fecha: string;
  horaInicio: string;
  horaFinal: string;
  listaEstudiantes: [];
}

const TASIST_KEY = 'my-tAsist';

@Injectable({
  providedIn: 'root'
})

export class TAsistenciaService {

  // Private de Asistencias Para Profesor
  private _storage: Storage;
  newTAsist: tAsist = <tAsist>{};
  
  constructor(private storage: Storage) {
    this.init();
  }

  // Creamos el Storage de Estudiantes
  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // AGREGAR ESTUDIANTES
  async addDatos(dato: tAsist):Promise<any>{
    return this.storage.get(TASIST_KEY).then((datos : tAsist[])=>{
      if (datos){
        datos.push(dato);
        // this.crearStudent(dato).subscribe();
        return this.storage.set(TASIST_KEY, datos);
      } else {
        return this.storage.set(TASIST_KEY, [dato]);
      }
    })
  }

  // OBTENER ESTUDIANTES
  async getAll():Promise<tAsist[]>{
    return this.storage.get(TASIST_KEY);
  }
}
