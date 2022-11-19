import { Component, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns';

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

  class: string;
  section: string;
  schedule: string;

  constructor() { }

  ngOnInit() {
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
    if (this.class){
      const data = [this.class, this.section, this.schedule];
      this.qrData = JSON.stringify(data);
      const datos = JSON.parse(this.qrData);
      this.createdCode = datos;
    } else {
      console.log('NO HAY DATO CLASE')

      // HACER VALIDACIÓN PARA QUE ESTÉN TODOS LOS DATOS ANTES DE GENERAR
      // TALVEZ ME CONVIENE USAR EL FORMULARIO REACTIVO
      // INVESTIGAR BIEN QUÉ DATOS PEDIR PARA GENERAR EL QR
    }
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
}
