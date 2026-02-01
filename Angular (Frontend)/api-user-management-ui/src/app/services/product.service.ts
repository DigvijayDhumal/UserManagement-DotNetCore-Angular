import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private apiUrl = 'http://localhost:5118/api';

  constructor(private http: HttpClient) {}

  getProductsByUser(userId: number) {
    return this.http.get(`${this.apiUrl}/products/user/${userId}`);
  }

  addProduct(product: any) {
    return this.http.post(`${this.apiUrl}/products`, product);
  }

  updateProduct(id: number, product: any) {
    return this.http.put(`${this.apiUrl}/products/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }
}
