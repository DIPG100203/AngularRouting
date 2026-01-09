/* eslint-disable @angular-eslint/prefer-inject */
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { switchMap } from 'rxjs';
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from '../../models/product';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  template: '',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsComponent {
  shoppingCart: Product[] = [];

  total = 0;

  @Input() products: Product[] = [];
  @Input() set productId(id: string | null) {
    if (id) {
      this.onShowDetail(id);
    }
  }
  @Output() loadMore = new EventEmitter();

  showProductDetail = false;

  productChosen: Product = {
    id: '',
    title: '',
    price: 0,
    slug: '',
    images: [],
    description: '',
    category: {
      id: '',
      name: '',
    },
  };

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  today = new Date();
  date = new Date(2024, 11, 25);

  
  constructor(
    private stService: StoreService,
    private productsService: ProductsService
  ) {
    this.shoppingCart = this.stService.getShopping();
  }

  // funcion para evitar repetir codigo de paginacion

  onAddToShoppingCart(product: Product) {
    console.log(product);
    this.stService.addProduct(product);
    this.total = this.stService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    if (!this.showProductDetail) {
      this.showProductDetail = true;
    }
    this.productsService.getProduct(id).subscribe(
      (data) => {
        this.productChosen = data;
        this.statusDetail = 'success';
      },
      (errorMesagge) => {
        window.alert(errorMesagge);
        this.statusDetail = 'error';
      }
    );
  }

  readUpdate(id: string) {
    this.productsService
      .getProduct(id)
      .pipe(
        switchMap((product) =>
          this.productsService.updateProduct(product.id, { title: 'change' })
        )
      )
      .subscribe((data) => {
        console.log(data);
      });
    this.productsService
      .fetchReadAndUpdate(id, { title: 'change' })
      .subscribe((response) => {
        const read = response[0];
        const update = response[1];
        console.log('read', read);
        console.log('update', update);
      });
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo Producto',
      description: 'Descripcion del producto',
      images: ['https://placeimg.com/640/480/any'],
      price: 1000,
      categoryId: 1,
    };
    this.productsService.createProduct(product).subscribe((data) => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'Producto Actualizado',
      price: 2000,
      images: this.productChosen.images,
    };
    const id = this.productChosen.id;
    this.productsService.updateProduct(id, changes).subscribe((data) => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products[productIndex] = data;
    });
  }

  deleteProuct() {
    const id = this.productChosen.id;
    this.productsService.deleteProduct(id).subscribe(() => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  onLoadMore() {
    this.loadMore.emit();
  }

  /* loadMore() {
    this.productsService
      .getProductsByPages(this.limit, this.offset)
      .subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  } */
}
