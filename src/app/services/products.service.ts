import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product';
import { retry, catchError, map } from 'rxjs';
import { throwError, zip } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private API_URL = `${environment.APIURL}/api/v1`;

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private http: HttpClient) { }

  getByCategory(categoryId: string, limit?: number, offset?: number) {
    let params = new HttpParams();
    if(limit && offset) {
      params = params.set('limit', limit)
      params = params.set('offset', offset)
    }
    return this.http.get<Product[]>(`${this.API_URL}/categories/${categoryId}/products`, {params})
  }

  getAllProducts(limit?: number, offset?: number) {
    
    let params = new HttpParams();
    if(limit && offset) {
      params = params.set('limit', limit)
      params = params.set('offset', offset)
    }
    return this.http.get<Product[]>(`${this.API_URL}/products`, {params})
    .pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
     return zip(
    this.getProduct(id),
    this.updateProduct(id, dto)
    )
  }


  getProduct(id: string) {
    return this.http.get<Product>(`${this.API_URL}/products/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError(' EL PENDEJO QUE ESCRIBIO LA API SE EQUIVOCO EN ALGO!!!');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('EL PRODUCTO NO EXISTE!!!');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('NO ESTAS AUTORIZADO!!!');
        }
        return throwError('MIERDA!!!');
      })
    )
  }

  getProductsByPages(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.API_URL}/products`, {
      params: {limit, offset}
    })
  }

  createProduct(data: CreateProductDTO) {
    return this.http.post<Product>(`${this.API_URL}/products`, data)
  }

  updateProduct(id: string, data: UpdateProductDTO) {
    return this.http.put<Product>(`${this.API_URL}/products/${id}`, data)
    // put es para actualizar todo el objeto
    // patch es para actualizar solo una parte del objeto
  }

  deleteProduct(id: string) {
    return this.http.delete<boolean>(`${this.API_URL}/products/${id}`);
  }
}
