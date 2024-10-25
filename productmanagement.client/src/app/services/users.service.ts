import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  

  constructor(private http:HttpClient) { }


  private API_URL = environment.apiURL;
  

  /* 
    get all users
    admin role required
  */
   getUsers():Observable<any> {
    return this.http.get(`${this.API_URL}/Users/`);
  }
}
