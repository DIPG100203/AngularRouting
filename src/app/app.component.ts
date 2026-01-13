/* eslint-disable @angular-eslint/prefer-inject */
import { Component, OnInit } from '@angular/core';
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
import { TokenService } from './services/token/token.service';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImgComponent, FormsModule, ProductComponent, CommonModule, ProductsComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  imgParent = '';
  token = '';
  imgRta = '';

  constructor(
    private auth: AuthService,
    private users: UsersService,
    private files: FilesService,
    private tokens: TokenService
  ) {}

  ngOnInit(): void {
    const token = this.tokens.getToken()
    if (token) {
      this.auth.profile(token).subscribe()
    }
  }
  

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  createUser() {
    this.users.create({
      name: 'Juan', 
      email: 'juan@example.com',
      password: '123456',
      avatar: 'https://i.pravatar.cc/150?img=3',
      role: 'customer'
    })
    .subscribe(rta => {
      console.log(rta);
    })
  }

  login() {
    this.auth.login('john@mail.com', 'changeme').subscribe(rta => {
      console.log(rta.access_token)
      this.token = rta.access_token;
    })
  }

  getProfile() {
    this.auth.profile(this.token)
    .subscribe(profile => {
      console.log(profile)
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
