import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProductModel {
  id?:number;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private API_URL = 'https://localhost:7033/api/Products';
  constructor(private http: HttpClient) {}

  /**
   * Get all Products
   * @returns 
   */
  getProducts(): Observable<any> {
    return this.http.get(this.API_URL + '/');
  }
  
  /**
   * Return one Product
   * @param id 
   */
  getProduct(id:number): Observable<any>{
    return this.http.get(this.API_URL + '/'+id);
  }

  /**
   * Add new Product
   * @param product 
   * @returns 
   */
  addProduct(product: ProductModel): Observable<any> {
    return this.http.post(this.API_URL + '/', product);
  }


  /**
   * Edit the a product by its Id
   * @param id  - Product Id
   */
  editProduct(product: ProductModel): Observable<any> {
    return this.http.put(this.API_URL+"/"+product.id,product);
  }
}
