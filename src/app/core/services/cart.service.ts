import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../models/product.model';
import { Service } from '@angular/core';

export interface CartItem {
  product: IProduct;
  quantity: number;
}

@Service()
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>(this.getCartFromStorage());
  cartItems$ = this.cartItems.asObservable();

  constructor() {}

  private getCartFromStorage(): CartItem[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  private saveCartToStorage(items: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items));
    this.cartItems.next(items);
  }

  addToCart(product: IProduct, quantity: number = 1) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.product._id === product._id);

    if (existingItem) {
      existingItem.quantity += quantity;
      this.saveCartToStorage([...currentItems]);
    } else {
      this.saveCartToStorage([...currentItems, { product, quantity }]);
    }
  }

  removeFromCart(productId: string) {
    const updated = this.cartItems.value.filter(item => item.product._id !== productId);
    this.saveCartToStorage(updated);
  }

  updateQuantity(productId: string, quantity: number) {
    const updated = this.cartItems.value.map(item => {
      if (item.product._id === productId) {
        item.quantity = quantity;
      }
      return item;
    });
    this.saveCartToStorage(updated);
  }

  getCartTotal(): number {
    return this.cartItems.value.reduce(
      (total, item) => total + item.product.price * item.quantity, 0
    );
  }

  clearCart() {
    this.saveCartToStorage([]);
  }
}