/* eslint-disable @angular-eslint/prefer-inject */
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImgComponent } from "./components/img/img.component";
import { FormsModule } from '@angular/forms';
import { ProductComponent } from "./components/product/product.component";
import { CommonModule } from '@angular/common';
import { ProductsComponent } from "./components/products/products.component";
import { NavComponent } from "./components/nav/nav.component";

import { AuthService } from './services/auth/auth.service';
import { UsersService } from './services/users/users.service';
import { FilesService } from './services/files/files.service';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImgComponent, FormsModule, ProductComponent, CommonModule, ProductsComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  imgParent = '';
  token = '';
  imgRta = '';

  constructor(
    private auth: AuthService,
    private users: UsersService,
    private files: FilesService
  ) {}
  

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  createUser() {
    this.users.create({
      name: 'Juan', 
      email: 'juan@example.com',
      password: '123456',
      avatar: 'https://i.pravatar.cc/150?img=3'
    })
    .subscribe(rta => {
      console.log(rta);
    })
  }

  downloadPDF() {
    this.files.getFiles('myPDF.pdf', 'https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf', 'application/pdf')
    .subscribe()
  }

  onUpload(event: Event) {
  const element = event.target as HTMLInputElement;
  const file = element.files?.item(0);

  if (file) {
    // ✅ preview local (NO SE TOCA)
    this.imgRta = URL.createObjectURL(file);

    // subida normal
    this.files.uploadFile(file).subscribe({
      next: () => {
        console.log('Imagen subida correctamente');
      },
      error: err => {
        console.error(err);
      }
    });
  }
}

  
}
