/* eslint-disable @angular-eslint/prefer-inject */
import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth/auth.service';
import { CategoriesService } from '../../services/categories/categories.service';
import { User } from '../../models/user';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from "@angular/router";


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {

  showMenu = false; 
  counter = 0;
  profile: User | null = null;
  categories: Category[] = []
  token = ''

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private store: StoreService,
    private auth: AuthService,
    private categoriesSer: CategoriesService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.store.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
    this.auth.user$.subscribe(
      data => {
        this.profile = data
      }
    )
  }
  

  toogleMenu() {
    this.showMenu = !this.showMenu;
  }

  login() {
    this.auth.loginAndGet('admin@mail.com', 'admin123')
    .subscribe(() => {
      this.router.navigate(['/profile'])
    })
  }

  getProfile () {
    this.auth.profile(this.token)
    .subscribe(user => {
      this.profile = user
    })
  }

  getAllCategories() {
    this.categoriesSer.getAll()
    .subscribe(data => {
      this.categories = data;
    })
  }

  logout() {
    this.auth.logOut()
    this.profile = null
    this.router.navigate(['/home'])
    console.log('funciona')
  }



}
