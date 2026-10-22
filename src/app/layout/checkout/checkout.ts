import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.services';
@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {
  private _cartService = inject(CartService);
  private _orderService = inject(OrderService);
  private _router = inject(Router);

  cartItems: CartItem[] = [];
  total: number = 0;
  isLoading: boolean = false;

  shippingAddress = {
    governorate: '',
    city: '',
    street: '',
    building: '',
    floor: '',
    apartment: '',
    phone: ''
  };

  ngOnInit(): void {
    this._cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.total = this._cartService.getCartTotal();
    });

    if (this.cartItems.length === 0) {
      this._router.navigate(['/cart']);
    }
  }

  placeOrder(form: NgForm) {
    if (form.invalid) {
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsDirty();
      });
      return;
    }

    if (this.cartItems.length === 0) return;

    this.isLoading = true;

    const orderData = {
      items: this.cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      shippingAddress: this.shippingAddress
    };

    this._orderService.createOrder(orderData).subscribe({
      next: (res: any) => {
        alert('Order placed successfully!');
        this._cartService.clearCart();
        this._router.navigate(['/home']);
      },
      error: (err: any) => {
        console.log(err);
        alert(err.error?.message || 'Something went wrong');
        this.isLoading = false;
      }
    });
  }
}