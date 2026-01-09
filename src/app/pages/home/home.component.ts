/* eslint-disable @angular-eslint/prefer-inject */
import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from "../../components/products/products.component";
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  products: Product[] = [];
  limit = 10;
  offset = 0;
  productId: string | null = null;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  private pagination() {
    this.productsService.getProductsByPages(10, 0).subscribe(
      (data) => {
        this.products = data;
        this.offset += this.limit;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.pagination();

    this.productsService.getAllProducts(10, 0).subscribe((products) => {
      this.products = products;
    });
    this.route.queryParamMap.subscribe(params => {
      this.productId=params.get('product');
      console.log(this.productId)
    })

  }

  onLoadMore() {
    this.productsService
      .getProductsByPages(this.limit, this.offset)
      .subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }

}
