import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserModel } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  readonly API_URL = environment.apiURL;
  constructor(private http:HttpClient) { }

  /**
   * get all users
   * 
   */
   getUsers():Observable<any> {
    return this.http.get(`${this.API_URL}/Users/`);
  }

  /**
   * get user by id
   * @param id 
   * @returns 
   */
   getUser(id:number):Observable<any> {
    return this.http.get(this.API_URL+"/Users/"+id);
  }
  
  /**
   * edit user
   * @param user 
   * @returns 
   */
  editUser(user:UserModel){
    return this.http.put(this.API_URL+"/Users/"+user.id,user);
  }

  /**
   * create a new user
   * @param user 
   * @returns 
   */
  createUser(user:UserModel){
    return this.http.post(this.API_URL+"/Users/",user);
  }
  
  deleteUser(id:number){
    return this.http.delete(this.API_URL+"/Users/"+id);
  }


}
