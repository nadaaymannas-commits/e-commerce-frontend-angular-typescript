import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './shared/footer/footer';
import { AuthService } from './core/services/auth.service';

@Component({
  imports: [RouterOutlet,Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit{
 
  protected readonly title = signal('myStore');
  private _authService = inject(AuthService);

   ngOnInit(): void {
   this._authService.checkIfLogedin();
  }
}
