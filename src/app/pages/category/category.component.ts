/* eslint-disable @angular-eslint/prefer-inject */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { switchMap } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsComponent } from '../../components/products/products.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: ProductsService
  ) {}

  /* ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap((params) => {
        this.categoryId = params.get('id')
        if (this.categoryId) {
          this.service.getByCategory(this.categoryId, this.limit, this.offset)
        }
        return [];
      })
    )
    .subscribe((data) => {
      this.products = data
    });
  } */

    ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.categoryId = params.get('id');
          if (this.categoryId) {
            return this.service.getByCategory(
              this.categoryId,
              this.limit,
              this.offset
            );
          }
          return [];
        })
      )
      .subscribe((data) => {
        this.products = data;
      });
  }

  loadmore() {
    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('id');
      if (this.categoryId) {
        this.service
          .getByCategory(this.categoryId, this.limit, this.offset)
          .subscribe((data) => {
            this.products = this.products.concat(
              data.filter((product) => product.images.length > 0)
            );
            this.offset += this.limit;
          });
      }
    });
  }
}
