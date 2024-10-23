import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

   
  private API_URL = "https://localhost:7033/api/Products";
  constructor(private http:HttpClient) { }
  
  // get single product
   getProducts():Observable<any> {
    return this.http.get(this.API_URL+"/");
  }

}
