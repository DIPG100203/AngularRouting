import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';
import { ImgComponent } from "../img/img.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ImgComponent, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  @Input()product: Product = {
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

  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();

  onAddToCart() {
    console.log("Agregar al carrito");
    this.addedProduct.emit(this.product);
  }

  onShowDetail() {
    this.showProduct.emit(this.product.id)
  }


}
