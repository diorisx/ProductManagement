import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public email:string = "";
  public password:string = "";

  constructor(private authService: AuthService, private router:Router){}
  
  public Authenticate(){
    this.authService.login(this.email,this.password).subscribe({
      next: (response)=>{
        const token = response.token;
        this.authService.saveToken(response.token);
        this.router.navigate(['/dashboard']);
        console.log(token);
      },
      error: (error)=>{
        console.log('Error on logging: ', error);
      }
    }); 
    //console.log(`Login Result:  ${this.email}, ${this.password}`);
  }



}
