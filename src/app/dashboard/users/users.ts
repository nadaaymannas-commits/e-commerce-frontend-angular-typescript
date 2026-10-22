import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user-service';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {
  private _userService = inject(UserService);
  
  users: any[] = [];

  ngOnInit(): void {
    this._userService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res.data;
      },
      error: (err: any) => {
        console.error('Error fetching users', err);
      }
    });
  }
}