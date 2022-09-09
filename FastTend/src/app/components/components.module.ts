import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MainMenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    MainMenuComponent
  ]
})
export class ComponentsModule { }
