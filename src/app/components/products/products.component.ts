import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product';
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsComponent implements OnInit {
  shoppingCart: Product[] = [];

  total = 0;

  products: Product[] = [
    
  ];

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
      name: ''
    }
  }

  limit = 10;
  offset = 0;



  today = new Date();
  date = new Date(2024, 11, 25);


  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private stService: StoreService, 
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private productsService: ProductsService 
  ) {

    this.shoppingCart = this.stService.getShopping();

  }

  ngOnInit(): void {

    this.productsService.getProductsByPages(10, 0).subscribe(data => {
      this.products=data;
      this.offset += this.limit;
    });

  }

  onAddToShoppingCart(product: Product) {
    console.log(product);
    this.stService.addProduct(product);
    this.total = this.stService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.productsService.getProduct(id).subscribe(data => {
      this.toggleProductDetail();
      this.productChosen = data;
    })

  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo Producto',
      description: 'Descripcion del producto',
      images: ['https://placeimg.com/640/480/any'],
      price: 1000,
      categoryId: 1
    }
    this.productsService.createProduct(product).subscribe(data => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'Producto Actualizado',
      price: 2000,
      images: this.productChosen.images
    }
    const id= this.productChosen.id;
    this.productsService.updateProduct(id, changes).subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
    })
  }

  deleteProuct() {
    const id = this.productChosen.id;
    this.productsService.deleteProduct(id).subscribe(() =>{
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    })
  }

  loadMore() {
    this.productsService.getProductsByPages(this.limit, this.offset).subscribe(data => {
      this.products=this.products.concat(data);
      this.offset += this.limit;
    });
  }
}
