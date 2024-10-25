import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductModel } from '../models/product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private API_URL = environment.apiURL;
  constructor(private http: HttpClient) {}

  /**
   * Get all Products
   * @returns 
   */
  getProducts(): Observable<any> {
    return this.http.get(this.API_URL + '/Products/');
  }
  
  /**
   * Return one Product
   * @param id 
   */
  getProduct(id:number): Observable<any>{
    return this.http.get(this.API_URL + '/Products/'+id);
  }

  /**
   * Add new Product
   * @param product 
   * @returns 
   */
  addProduct(product: ProductModel): Observable<any> {
    return this.http.post(this.API_URL + '/Products/', product);
  }


  /**
   * Edit the a product by its Id
   * @param id  - Product Id
   */
  editProduct(product: ProductModel): Observable<any> {
    return this.http.put(this.API_URL+"/Products/"+product.id,product);
  }
  
  /**
   * Delete a product
   * @param id 
   * @returns 
   */
  deleteProduct(id:number){
    return this.http.delete(this.API_URL+"/Products/"+id);
  }

}
