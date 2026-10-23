import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CartService, CartItem } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { enveronment } from '../../../environments/env';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit, OnDestroy {
  private _cartService = inject(CartService);
  private _productService = inject(ProductService);
  private _cdr = inject(ChangeDetectorRef);

  staticURL = enveronment.staticURL;

  cartItems: CartItem[] = [];
  total: number = 0;
  priceChanged: boolean = false;

  private _sub = new Subscription();

  ngOnInit(): void {
    this._sub.add(
      this._cartService.cartItems$.subscribe(items => {
        this.cartItems = items;
        this.total = this._cartService.getCartTotal();
      })
    );

    this._sub.add(
      this._cartService.priceChanged$.subscribe(value => {
        this.priceChanged = value;
        this._cdr.detectChanges();
      })
    );

    this.checkPrices();
  }

changedProducts: string[] = [];

checkPrices() {
  this._productService.getAllProducts().subscribe({
    next: (res: any) => {
      const freshProducts = res.data;
      let changed = false;
      this.changedProducts = []; // نصفرها كل مرة

      this.cartItems.forEach(cartItem => {
        const freshProduct = freshProducts.find((p: any) => p._id === cartItem.product._id);
        
        if (freshProduct && freshProduct.price !== cartItem.product.price) {
          changed = true;
          this.changedProducts.push(cartItem.product.name); // بنسجل اسم المنتج
          cartItem.product.price = freshProduct.price; 
        }
      });

      if (changed) {
        this._cartService.setPriceChanged(true);
        this._cartService.updateCartPrices(this.cartItems);
        this.total = this._cartService.getCartTotal();
        this._cdr.detectChanges();
      }
    }
  });
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