import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private API_URL = 'https://api.escuelajs.co/api/v1/products';

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private http: HttpClient) { }

  getAllProducts(limit?: number, offset?: number) {
    
    let params = new HttpParams();
    if(limit && offset) {
      params = params.set('limit', limit)
      params = params.set('offset', offset)
    }
    return this.http.get<Product[]>(this.API_URL, {params});

  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }

  getProductsByPages(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.API_URL}`, {
      params: {limit, offset}
    })
  }

  createProduct(data: CreateProductDTO) {
    return this.http.post<Product>(this.API_URL, data)
  }

  updateProduct(id: string, data: UpdateProductDTO) {
    return this.http.put<Product>(`${this.API_URL}/${id}`, data)
    // put es para actualizar todo el objeto
    // patch es para actualizar solo una parte del objeto
  }

  deleteProduct(id: string) {
    return this.http.delete<boolean>(`${this.API_URL}/${id}`);
  }
}
