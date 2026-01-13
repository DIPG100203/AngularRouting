import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { LoginComponent } from './pages/login/login.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'category/:id',
        component: CategoryComponent
    },
    {
        path: 'product/:id',
        component: ProductDetailComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'cart',
        component: MyCartComponent
    },
    {
        path: 'profile',
        canActivate: [authGuard],
        component: ProfileComponent
    },
    {
        path: 'recovery',
        component: RecoveryComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'cms',
        canActivate: [adminGuard],
        loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
