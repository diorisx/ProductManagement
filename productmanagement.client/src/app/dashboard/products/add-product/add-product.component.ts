import { Component, inject } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ProductsService } from '../../../services/products.service';

export interface ProductModel {
  name?:string;
  description?:string;
  price?:number;
  stock?:number;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  product: ProductModel = {}
  private _snackBar = inject(MatSnackBar);
  
  constructor(private producService: ProductsService){

  }

  AddProduct(){
    if (!this.product.name || !this.product.price){
        this._snackBar.open("Name and price are required","Ok", {duration:3000});
        return;
    }
    this.producService.addProduct(this.product).subscribe({
      next:(res)=>{
        this._snackBar.open("Product Added","",{duration:2000});
      }, 
      error: (error)=>{
        this._snackBar.open("Error","",{duration:2000});
        console.log(error);

      }
    });

  }

}
