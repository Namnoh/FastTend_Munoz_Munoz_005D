import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';

interface Ventana{
  icon: string;
  name: string;
  redirectTo: string;
}

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  animations: [
    trigger('enterState', [
      state('void', style({
        transform: 'scale(0)',
        opacity: 0
      })),
      transition(':enter', [
        animate(300, style({
          transform:'scale(1)',
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate(300, style({
          transform:'scale(0)',
          opacity: 0
        })),
      ])
    ]),
    trigger('option', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter', [
        animate(300, style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate(300, style({
          opacity: 0
        })),
      ])
    ])
  ]
})

export class MainMenuComponent implements OnInit {
  
  isShowing: boolean = false;
  @Output() mostrar =new EventEmitter();

  constructor() {
  }
  ngOnInit() {}

  ventanas: Ventana[]=[ 
    {
      icon: 'home',
      name:  'Inicio',
      redirectTo: '/inicio'
    },
    {
      icon: 'person',
      name:  'Perfil',
      redirectTo: '/profile'
    },
    {
      icon: 'document-text',
      name:  'Registro Asistencia',
      redirectTo: '/attendance'
    },
    {
      icon: 'settings',
      name:  'Ajustes',
      redirectTo: ''
    },
    {
      icon: 'log-out',
      name:  'Cerrar Sesión',
      redirectTo: '/welcome'
    }
  ];

  open(){
    if (this.isShowing){
      this.isShowing= false;
      console.log('CERRANDO');
    }
    else{
      this.isShowing= true;
      console.log('MOSTRANDO');
    }

    this.mostrar.emit();
  }
}