import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.apiURL;
  constructor(private http:HttpClient, private router:Router) { }
  
  // login
   login(email:string, password:string):Observable<any> {
    return this.http.post(this.API_URL+"/Auth/Authenticate",{email,password});
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(["/login"])
    
  }

  refreshToken(){
    return this.http.get(this.API_URL+"/Auth/RefreshToken");
  }

  // set JWT
   saveToken(token: string): void {
    localStorage.setItem('token',token);
  }


  // get JWT
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }



}
