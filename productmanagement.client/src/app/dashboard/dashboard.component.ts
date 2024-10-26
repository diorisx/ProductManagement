import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../core/services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  showFiller = false;
  user:any = null;
  constructor(private authService:AuthService){}

  ngOnInit(): void {
    this.user = this.authService.userdata;
  }

  Logout(){
    this.authService.logout();
  }
}
