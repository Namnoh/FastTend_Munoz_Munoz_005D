import { Component, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { DatosApiService } from '../../services/datos-api.service';
import { TAsistenciaService, tAsist } from '../../services/t-asistencia.service';
import { IClase } from '../../interfaces/idato';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.page.html',
  styleUrls: ['./generate-qr.page.scss'],
})

export class GenerateQrPage implements OnInit {

  isGenerated: boolean = false;
  qrData:string | null = null;
  createdCode:string | null = null;
  isShowing: boolean = true;
  tAsist : tAsist;
  lista : [];
  cantidad = 0;
  clase : string[];

  currentClass: IClase;
  sigla: string;
  class: string;
  section: string;

  schedule: string;
  fecha = "";

  beginning: string;
  inicio = "";
  
  ending: string;
  final = "";

  clases=[];

  constructor(private navCtrl: NavController, private datosApi: DatosApiService, private loadCtrl: LoadingController, private tAsistenciaService: TAsistenciaService) { }

  ngOnInit() {
    this.loadClases();
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
  }

  // FUNCIÓN GENERAR QR
  generateCode(){
    this.datosApi.listarEstudiantes().subscribe((resp) =>{
      let listString = JSON.stringify(resp);
      let array = JSON.parse(listString);
      this.cantidad = array.length;
      if (this.cantidad != 0){
        for (let i = 1; i <= this.cantidad; i++) {
          this.datosApi.deleteAll(i).subscribe();
        }
      }
    });
    if (this.currentClass){
      const dateFromIonDatetime = this.schedule;
      const formattedString = format(parseISO(dateFromIonDatetime), 'dd-MM-yyyy');
      this.fecha = formattedString;
      const hour1 = this.beginning;
      const format1 = format(parseISO(hour1), 'HH:mm');
      this.inicio = format1;
      const hour2 = this.ending;
      const format2 = format(parseISO(hour2), 'HH:mm');
      this.final = format2;
      const data = [this.sigla, this.class, this.section, this.fecha, this.inicio, this.final];
      this.clase = data;
      this.qrData = JSON.stringify(data);
      this.createdCode = this.qrData;
    } else {
      console.log('NO HAY DATO / CLASE')
    }
  }

  guardarAsistencia(){
    this.datosApi.listarEstudiantes().subscribe(
      (resp)=>{
        console.log(resp);
        let listString = JSON.stringify(resp); // Convertimos a String el arreglo que recibimos
        let array = JSON.parse(listString);
        this.lista = array;
        console.log(this.lista);
        this.tAsist = {
          siglas: this.sigla,
          fecha: this.fecha,
          horaInicio: this.inicio,
          horaFinal: this.final,
          listaEstudiantes: this.lista
        }
        this.tAsistenciaService.addDatos(this.tAsist);
        this.navCtrl.navigateRoot('welcome');
      },
      (err)=>{
        console.log(err, onmessage);
      }
    );
    
  }

  // FORMATEO SOLO DÍAS DE SEMANA
  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    /**
     * Date will be enabled if it is not
     * Sunday or Saturday
     */
    return utcDay !== 0 && utcDay !== 6;
  };

  // LISTA CLASES
  async loadClases(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadCtrl.create({
      message : "Cargando...",
      spinner : "bubbles"
    });
    await loading.present;
    
    this.datosApi.listarClases(localStorage.getItem('profile')).subscribe(
      (resp)=>{
        loading.dismiss();
        console.log(resp);
        let listString = JSON.stringify(resp); // Convertimos a String el arreglo que recibimos
        this.clases = JSON.parse(listString);
        event?.target.complete();
      },
      (err)=>{
        console.log(err, onmessage);
        loading.dismiss();
      }
    )
  }

  handleChange(ev) {
    this.currentClass = ev.target.value;
    this.sigla = this.currentClass.sigla;
    this.class= this.currentClass.nombre;
    this.section = this.currentClass.seccion;
    console.log(this.currentClass)
  }
}
