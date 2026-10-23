import { CategoryService } from './../../../core/services/category.services';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { ICategory } from '../../../core/models/category.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header implements OnInit, OnDestroy {
  private _authService = inject(AuthService);
  private _categoryService = inject(CategoryService);
  private _cartService = inject(CartService);
  private _router = inject(Router);

  userName = '';
  categories: ICategory[] = [];
  cartCount = 0;

  private _subs = new Subscription();

  ngOnInit(): void {
this._subs.add(
  this._authService.getUserData().subscribe((data) => {
    this.userName = data ? data.name : '';
    this._cartService.refreshCart(); 
  })
);

    this._subs.add(
      this._categoryService.getAllCategories().subscribe((res: any) => {
        this.categories = res.data;
      })
    );

    this._subs.add(
      this._cartService.cartItems$.subscribe((items) => {
        this.cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
      })
    );
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  logout() {
    this._authService.logOut();
  }

  goToProfile() {
  if (this._authService.ifLogedinWithRole('admin')) {
    this._router.navigate(['/dashboard']);
  } 
  else if (this._authService.ifLogedinWithRole('user')) {
    this._router.navigate(['/user-profile']);
  } 
  else {
    this._router.navigate(['/login']);
  }
}
}