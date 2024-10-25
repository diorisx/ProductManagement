import { Component, inject, ViewChild } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ProductModel } from '../../core/models/product.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../layout/dialog/dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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

  totalItems: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getProducts();
  }


  getProducts() {
    this.isLoading = true;
    this.productService
      .getProducts({query:this.search,pageNumber:this.pageIndex+1, pageSize:this.pageSize})
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          this.productList = res.products;
          this.totalItems = res.totalItems;
          // this.pageIndex = res.totalPages;
          // console.log(res);
        },
        error: (error) => {
          console.log('Error getting the products:', error);
        },
      });
  }

  getByName(){
    this.isLoading = true;
    this.productService
    .getProducts({query:this.search, pageSize:this.pageSize,pageNumber:this.pageIndex+1})
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: (res) => {
        // console.log(res);
        this.productList = res.products;
        this.totalItems = res.totalItems;

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
