import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface sAsist{
  sig: string;
  nombre: string;
  seccion: string;
  fecha: string;
  horaInicio: string;
  horaFinal: string;
}

const SASIST_KEY = 'my-sAsist';

@Injectable({
  providedIn: 'root'
})

export class SAsistenciaService {

  // Private de Asistencias Para Profesor
  private _storage: Storage;
  newSAsist: sAsist = <sAsist>{};
  
  constructor(private storage: Storage) {
    this.init();
  }

  // Creamos el Storage de Estudiantes
  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // AGREGAR ESTUDIANTES
  async addDatos(dato: sAsist):Promise<any>{
    return this.storage.get(SASIST_KEY).then((datos : sAsist[])=>{
      if (datos){
        datos.push(dato);
        // this.crearStudent(dato).subscribe();
        return this.storage.set(SASIST_KEY, datos);
      } else {
        return this.storage.set(SASIST_KEY, [dato]);
      }
    })
  }

  // OBTENER ESTUDIANTES
  async getAll():Promise<sAsist[]>{
    return this.storage.get(SASIST_KEY);
  }
}
