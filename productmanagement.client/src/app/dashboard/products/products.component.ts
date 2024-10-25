import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

export interface ProductModel {
  id: number;
  name: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  displayedColumns: string[] = ['name', 'price', 'stock', 'edit'];
  productList: ProductModel[] = [];
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.GetProducts();
  }

  editProduct(id: number) {
    this.router.navigate(['/dashboard/edit-product/' + id]);
  }

  // Get all product
  GetProducts() {
    this.isLoading = true;
    this.productService
      .getProducts()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          // this.productList = [res]; // Asignar como un nuevo array
          this.productList = res;
        },
        error: (error) => {
          console.log('Error getting product:', error);
        },
      });
  }
}
