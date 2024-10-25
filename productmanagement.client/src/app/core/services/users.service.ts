import { HttpClient, HttpParams } from '@angular/common/http';
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
   * get all users, filter
   * 
   */
   getUsers({query="",pageNumber=1,pageSize=10} 
    : {query?:string, pageNumber?:number, pageSize?:number}): Observable<any> {
      const params = new HttpParams()
      .set('username',query)
      .set('pageNumber',pageNumber)
      .set('pageSize',pageSize)
    return this.http.get(this.API_URL+"/Users",{params});
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
  
  /**
   * delete an user
   * @param id 
   * @returns 
   */
  deleteUser(id:number){
    return this.http.delete(this.API_URL+"/Users/"+id);
  }


}
