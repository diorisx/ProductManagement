import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _snackBar = inject(MatSnackBar);
  
  public email:string = "";
  public password:string = "";
  public isLoading = false;

  constructor(private authService: AuthService, private router:Router){}
  
  public Authenticate(){
    this.isLoading = true;

    this.authService.login(this.email,this.password).pipe(
      finalize(()=> this.isLoading = false )
    ).subscribe({
      next: (response)=>{
        const token = response.token;
        this.authService.saveToken(response.token);
        this.authService.userdata = response.user;
        this.router.navigate(['/dashboard']);
      },
      error: (error)=>{
        console.log('Error on logging: ', error);
        this._snackBar.open(error.error,"Ok",{duration:2000})
      },  
      
    });
  }



}
