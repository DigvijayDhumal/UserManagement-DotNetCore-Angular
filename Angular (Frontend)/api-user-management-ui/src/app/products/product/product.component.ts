import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  userId = 1; // login user
  products: any[] = [];

  product = {
    userId: 1,
    productName: '',
    price: 0,
    quantity: 0
  };

  isEdit = false;
  editId = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProductsByUser(this.userId).subscribe(res => {
      this.products = res as any[];
    });
  }

  saveProduct() {
    if (this.isEdit) {
      this.productService.updateProduct(this.editId, this.product)
        .subscribe(() => {
          this.resetForm();
          this.loadProducts();
        });
    } else {
      this.productService.addProduct(this.product)
        .subscribe(() => {
          this.resetForm();
          this.loadProducts();
        });
    }
  }

  editProduct(p: any) {
    this.isEdit = true;
    this.editId = p.productId;
    this.product = { ...p };
  }

  deleteProduct(id: number) {
    if (confirm('Delete this product?')) {
      this.productService.deleteProduct(id)
        .subscribe(() => this.loadProducts());
    }
  }

  resetForm() {
    this.isEdit = false;
    this.product = {
      userId: this.userId,
      productName: '',
      price: 0,
      quantity: 0
    };
  }
  openAdd() {
  this.isEdit = false;
  this.product = {
    userId: this.userId,
    productName: '',
    price: 0,
    quantity: 0
  };
}

openEdit(p: any) {
  this.isEdit = true;
  this.editId = p.productId;
  this.product = { ...p };
}
showForm = false;

toggleForm() {
  this.isEdit = false;
  this.showForm = true;
  this.product = {
    userId: this.userId,
    productName: '',
    price: 0,
    quantity: 0
  };
}

cancelForm() {
  this.showForm = false;
}


}
