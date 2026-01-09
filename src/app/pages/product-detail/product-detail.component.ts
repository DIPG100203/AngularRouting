/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/prefer-inject */
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { CommonModule, Location } from '@angular/common';
import { Swiper } from 'swiper/types';
import { SwiperContainer } from 'swiper/element';
import { SwiperSlide } from 'swiper/element';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailComponent implements OnInit {

  productId: string | null = null;
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private service: ProductsService,
    private loca: Location
  ) {}

  ngOnInit(): void {
      this.route.paramMap
        .pipe(
          switchMap((params) => {
            this.productId = params.get('id');
            if (this.productId) {
              return this.service.getProduct(this.productId);
            }
            return [null];
          })
        )
        .subscribe((data) => {
          this.product = data;
        });
    }

    goToBack() {
      this.loca.back()
    }

}
