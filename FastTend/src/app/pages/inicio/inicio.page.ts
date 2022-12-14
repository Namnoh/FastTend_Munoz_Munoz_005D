import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { IClase } from '../../interfaces/idato';
import { DatosApiService } from '../../services/datos-api.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  
  weather;
  estado: number;
  img: string;

  type: string = ' ';

  isShowing: boolean = true;

  clase : IClase = {
    sigla:"",
    nombre:"",
    seccion:"",
    profesor:localStorage.getItem('profile'),
  };
  

  constructor(private weatherService: WeatherService, private datosApi:DatosApiService) {
  }

  ngOnInit() {
    this.weatherService.getWeather('santiago','cl')
    .subscribe(
      res => {
        console.log(res);
        this.weather = res;
        this.estado = this.weather.main.temp;
        console.log(this.estado);
        if( this.estado > 0 && this.estado < 20 ){
          this.img = 'snowy';
        }
        else if ( this.estado > 20 && this.estado < 24 ) {
          this.img = 'cloudy';
        }
        else{
          this.img = 'day';
        }
      },
      err => console.log(err)
    )
  }

  ionViewWillEnter() {
    if (localStorage.getItem('type') == 'student') {
      this.type = 'student';
    }
    else {
      this.type = 'teacher';
    }
    console.log(this.type);
  }

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

  // API
  crearClase(){
    this.datosApi.crearClase(this.clase).subscribe();
    console.log('Clase Guardada')
  }
}
