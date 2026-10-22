import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ICanDeactivate } from '../../core/models/canDeactivate.model';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-signup',
  styleUrl: './signup.css',
  templateUrl: './signup.html',
})
export class Signup implements ICanDeactivate {

  private _authService = inject(AuthService);

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  canDeactivate(): boolean {
    if (this.myForm.dirty) {
      return confirm('are you sure?');
    }
    return true;
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this._authService.register(this.myForm.value).subscribe({
      next: () => {
        alert('Account created successfully!');
      },
      error: (err: any) => {
        alert(err.error?.message || 'Error creating account');
      }
    });
  }
}