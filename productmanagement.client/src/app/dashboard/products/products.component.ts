import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ProductModel } from '../../core/models/product.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../layout/dialog/dialog.component';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  readonly displayedColumns: string[] = ['name', 'price', 'stock', 'edit'];
  readonly _snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);
  search:string = "";

  productList: ProductModel[] = [];
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  editProduct(id: number) {
    this.router.navigate(['/dashboard/edit-product/' + id]);
  }

  getByName(){
    this.isLoading = true;
    this.productService
    .getProducts("search="+this.search)
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: (res) => {
        this.productList = res;
      },
      error: (error) => {
        console.log('Error getting the products:', error);
      },
    });
    
  }

  getProducts() {
    this.isLoading = true;
    this.productService
      .getProducts()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          this.productList = res;
        },
        error: (error) => {
          console.log('Error getting the products:', error);
        },
      });
  }

  deleteProduct(id:number){
    this.dialog.open(DialogComponent,{
      data:{message: "This product will be deleted permanently"}}).afterClosed().subscribe(result => {
        if(result){
          this.isLoading = true;
          this.productService
            .deleteProduct(id)
            .pipe(finalize(() => (this.isLoading = false)))
            .subscribe({
              next: (res) => {
                this.getProducts();
                this._snackBar.open("Product deleted","",{duration:3000});
              },
              error: (error) => {
                console.log('Error deleting the product:', error);
              },
            });
        }
      });

  }

}
