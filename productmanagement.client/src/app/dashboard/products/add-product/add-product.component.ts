import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../../../core/services/products.service';
import { ProductModel } from '../../../core/models/product.models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  product: ProductModel = {};
  isLoading: boolean = false;
  private _snackBar = inject(MatSnackBar);

  constructor(private producService: ProductsService) { }

  AddProduct() {
    if (!this.product.name || !this.product.price) {
      this._snackBar.open('Name and price are required', 'Ok', {
        duration: 3000,
      });
      return;
    }
    this.isLoading = true;
    this.producService
      .addProduct(this.product)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          this._snackBar.open('Product Added', '', { duration: 2000 });
        },
        error: (error) => {
          this._snackBar.open('Error something went wrong', '', {
            duration: 2000,
          });
          console.log(error);
        },
      });
  }
}
