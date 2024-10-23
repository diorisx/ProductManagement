import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = "https://localhost:7033/api/Auth/Authenticate";
  constructor(private http:HttpClient) { }
  
  // login
   login(email:string, password:string):Observable<any> {
    return this.http.post(this.API_URL,{email,password});
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
