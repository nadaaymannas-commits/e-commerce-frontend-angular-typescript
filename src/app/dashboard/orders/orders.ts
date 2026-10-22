import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../core/services/order.services';
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders implements OnInit {
  private _orderService = inject(OrderService);
  private _cdr = inject(ChangeDetectorRef);

  orders: any[] = [];
  
  allowedStatuses = ['shipped', 'delivered', 'received', 'rejected', 'refunded'];

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this._orderService.getAllOrders().subscribe({
      next: (res: any) => {
        this.orders = res.data;
        this._cdr.detectChanges();
      },
      error: (err: any) => console.error(err)
    });
  }

  changeStatus(orderId: string, newStatus: string) {
    if (!newStatus) return;

    if (confirm(`Are you sure you want to change status to ${newStatus}?`)) {
      this._orderService.updateOrderStatus(orderId, newStatus).subscribe({
        next: () => {
          alert('Order status updated!');
          this.loadOrders();
        },
        error: (err: any) => alert(err.error?.message || 'Error updating status')
      });
    }
  }
}