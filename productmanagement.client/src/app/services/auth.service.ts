import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = "https://localhost:7033/api/Users/Authenticate";
  constructor(private http:HttpClient) { }
  
  // login
   login(email:string, password:string):Observable<any> {
    //const headers = {"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSIsImp0aSI6IjU5ZjI0NzI4LWZiMzUtNDc5NS1hN2MyLTgxYjJjNWEzZjAxZiIsIklkIjoiNCIsIlJvbGUiOiJ1c2VyIiwiZXhwIjoxNzI5NTY4ODY1LCJpc3MiOiJleGFtcGxlLmNvbSIsImF1ZCI6ImxvY2FsaG9zdCJ9.VVs9nKQnaP9zUrsTVHwFaDmNhnzSgxOuLAWVA-3IZ9Y"};
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
