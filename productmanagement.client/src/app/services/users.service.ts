import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  

  constructor(private http:HttpClient) { }


  private API_URL = "https://localhost:7033/api/Users";
  

  /* 
    get all users
    admin role required
  */
   getUsers():Observable<any> {
    return this.http.get(`${this.API_URL}/`);
  }
}
