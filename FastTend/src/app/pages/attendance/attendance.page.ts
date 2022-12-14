import { Component, OnInit } from '@angular/core';
import { TAsistenciaService, tAsist } from '../../services/t-asistencia.service';
import { SAsistenciaService, sAsist } from '../../services/s-asistencia.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {

  type : string;
  listaT : tAsist[];
  listaS : sAsist[];

  constructor(private tAsistenciaService: TAsistenciaService, private sAsistenciaService: SAsistenciaService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.type = localStorage.getItem('type');
    this.tAsistenciaService.getAll().then(datos => {
      this.listaT = datos;
    })
    this.sAsistenciaService.getAll().then(datos => {
      this.listaS = datos;
    })
  }

  mostrarMenu(){
    console.log('EJECUCIÓN FUNCIÓN DESDE EL HOME');
  }
}
