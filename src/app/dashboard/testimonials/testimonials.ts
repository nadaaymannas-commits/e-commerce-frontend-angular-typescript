import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialService } from '../../core/services/testimonial.service';
@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class Testimonials implements OnInit {
  private _testimonialService = inject(TestimonialService);
  private _cdr = inject(ChangeDetectorRef);

  testimonials: any[] = [];

  ngOnInit(): void {
    this.loadTestimonials();
  }

  loadTestimonials() {
    this._testimonialService.getAllTestimonials().subscribe({
      next: (res: any) => {
        this.testimonials = res.data.testimonials;
        this._cdr.detectChanges();
      },
      error: (err: any) => console.error(err)
    });
  }

  changeStatus(id: string, status: string) {
    if (confirm(`Are you sure you want to ${status} this testimonial?`)) {
      this._testimonialService.updateTestimonialStatus(id, status).subscribe({
        next: () => {
          alert(`Testimonial ${status} successfully!`);
          this.loadTestimonials();
        },
        error: (err: any) => alert(err.error?.message || 'Error updating status')
      });
    }
  }
}