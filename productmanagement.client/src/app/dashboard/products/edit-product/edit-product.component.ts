import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, Observable } from 'rxjs';
import { ProductsService } from '../../../core/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductModel } from '../../../core/models/product.models';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})

export class EditProductComponent {
  private route = inject(ActivatedRoute);
  private _snackBar = inject(MatSnackBar);
  isLoading: boolean = false;
  product: ProductModel = {};
  productId: Observable<number | undefined>;
 
  // productId:number | any;

  constructor(private productService: ProductsService) {
    this.productId = this.route.params.pipe(map((params) => params['id']));
  }

  ngOnInit(): void {
    this.productId.subscribe((id) => {
      if (id != undefined) {
        this.GetProduct(id);
        return;
      }
    });
  }

  GetProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: (res: ProductModel) => {
        this.product = res;
      },
      error: (err) => {
        this._snackBar.open('Error something went wrong', '', {
          duration: 2000,
        });
      },
    });
  }

  EditProduct() {
    this.isLoading = true;
    this.productService
      .editProduct(this.product)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          this._snackBar.open('Product updated', '', { duration: 2000 });
        },
        error: (error) => {
          this._snackBar.open('Error something went wrong', '', {
            duration: 2000,
          });
        },
      });
  }
}
