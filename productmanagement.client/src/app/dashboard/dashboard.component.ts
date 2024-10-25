import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../core/services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  showFiller = false;
  constructor(private authService:AuthService){}


  Logout(){
    this.authService.logout();
  }
}
