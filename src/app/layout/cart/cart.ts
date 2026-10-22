import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CartService, CartItem } from '../../core/services/cart.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { enveronment } from '../../../environments/env';
@Component({
  selector: 'app-cart',
  imports: [RouterLink, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit, OnDestroy {
  private _cartService = inject(CartService);
    staticURL = enveronment.staticURL;

  cartItems: CartItem[] = [];
  total: number = 0;

  private _sub = new Subscription();

  ngOnInit(): void {
    this._sub.add(
      this._cartService.cartItems$.subscribe(items => {
        this.cartItems = items;
        this.total = this._cartService.getCartTotal();
      })
    );
  }

  updateQty(productId: string, qty: string) {
    const quantity = Number(qty);
    if (quantity > 0) {
      this._cartService.updateQuantity(productId, quantity);
    }
  }

  removeItem(productId: string) {
    this._cartService.removeFromCart(productId);
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}