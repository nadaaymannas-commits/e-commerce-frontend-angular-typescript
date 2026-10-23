import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home as HomeLayout } from './layout/home/home';
import { Productslist } from './layout/productslist/productslist';
import { Login } from './layout/login/login';
import { Signup } from './layout/signup/signup';
import { NotFound } from './shared/not-found/not-found';
import { ProductDetails } from './layout/productslist/product-details/product-details';
import { Cart } from './layout/cart/cart';
import { Checkout } from './layout/checkout/checkout';
import { authGuard } from './core/guards/auth-guard';
import { Dashboard } from './dashboard/dashboard';
import { Users } from './dashboard/users/users';
import { Categories } from './dashboard/categories/categories';
import { Subcategories } from './dashboard/subcategories/subcategories';
import { Products } from './dashboard/products/products';
import { Orders } from './dashboard/orders/orders';
import { adminGuard } from './core/guards/admin-guard';
import { Userprofile } from './layout/userprofile/userprofile';
import { Testimonials } from './dashboard/testimonials/testimonials';
import { TestimonialsList } from './layout/testimonials-list/testimonials-list';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeLayout },
      { path: 'product-list', component: Productslist },
      { path: 'product-list/:slug', component: ProductDetails },
      { path: 'cart', component: Cart },
      { path: 'checkout', component: Checkout, canActivate: [authGuard] },
      { path: 'user-profile', component: Userprofile, canActivate: [authGuard] },
      { path: 'login', component: Login },
      { path: 'signup', component: Signup },
      { path: 'testimonials', component: TestimonialsList },
    ],
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: Users },
      { path: 'categories', component: Categories },
      { path: 'subcategories', component: Subcategories },
      { path: 'products', component: Products },
      { path: 'orders', component: Orders },
      { path: 'testimonials', component: Testimonials },
    ],
  },
  { path: '**', component: NotFound },
];
