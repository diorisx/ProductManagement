import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';

export interface ProductModel {
  id: number;
  name: string;
  // description: string; // Cambiado a string
  price: number;
  // stock: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'], // Corregido el nombre de la propiedad
})
export class ProductsComponent {
  
  displayedColumns: string[] = ['name','price', 'stock','edit']; // Asegúrate de que el orden aquí coincide con tu HTML
  productList: ProductModel[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.GetProduct();
  }

  // Get single product
  public GetProduct() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        // En lugar de usar push, puedes asignar directamente si obtienes un solo producto
        this.productList = [res]; // Asignar como un nuevo array
        //console.log(this.productList);
        this.productList = res;
      },
      error: (error) => {
        console.log("Error getting product:", error);
      }
    });
  }
}
