import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IClases } from '../interfaces/idatos';
import { IClase,IStudent } from '../interfaces/idato';

@Injectable({
  providedIn: 'root'
})
export class DatosApiService {

  constructor(private http: HttpClient) { }

  // this.crearStudent(dato).subscribe();

  // MANDAR A API
  listarClases(profesor):Observable<IClases>{
    return this.http.get<IClases>(`${environment.apiURL}/clases?profesor=${profesor}`);
  }

  // CREAR EN API
  crearClase(newItem: IClase):Observable<IClase>{
    return this.http.post<IClase>(`${environment.apiURL}/clases`,newItem)
  }

  // MANDAR A API
  listarEstudiantes():Observable<IStudent>{
    return this.http.get<IStudent>(`${environment.apiURL}/estudiantes`);
  }

  // CREAR EN API
  crearEstudiante(newItem: IStudent):Observable<IStudent>{
    return this.http.post<IStudent>(`${environment.apiURL}/estudiantes`,newItem)
  }

  deleteAll(idEst: number){
    return this.http.delete(`${environment.apiURL}/estudiantes/${idEst}`);
  }
}