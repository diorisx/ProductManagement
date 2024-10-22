import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule } from '@angular/material/icon';
import {MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule, MatTableModule,MatButtonModule
    
  ], 
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule, MatTableModule,MatButtonModule
  ]
})
export class AppMaterialModule { }
