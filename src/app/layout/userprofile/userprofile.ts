import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user-service';
import { OrderService } from '../../core/services/order.services';
@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './userprofile.html',
  styleUrl: './userprofile.css'
})
export class Userprofile implements OnInit {
  private _userService = inject(UserService);
  private _orderService = inject(OrderService);
  private _cdr = inject(ChangeDetectorRef);

  user: any = { name: '', email: '' };
  orders: any[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadProfile();
    this.loadMyOrders();
  }

  loadProfile() {
    this._userService.getMyProfile().subscribe({
      next: (res: any) => {
        this.user = res.user;
        this.isLoading = false;
        this._cdr.detectChanges();
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  loadMyOrders() {
    this._orderService.getMyOrders().subscribe({
      next: (res: any) => {
        this.orders = res.data;
        this._cdr.detectChanges();
      },
      error: (err: any) => console.error(err)
    });
  }

  updateProfile() {
    this._userService.updateMyProfile(this.user).subscribe({
      next: () => alert('Profile updated successfully!'),
      error: (err: any) => alert(err.error?.message || 'Error updating profile')
    });
  }
}