import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialService } from '../../core/services/testimonial.service';

@Component({
  selector: 'app-testimonials-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials-list.html',
  styleUrl: './testimonials-list.css'
})
export class TestimonialsList implements OnInit {
  private _testimonialService = inject(TestimonialService);
  testimonials: any[] = [];

  ngOnInit(): void {
    this._testimonialService.getApprovedTestimonials().subscribe({
      next: (res: any) => {
        this.testimonials = res.data.testimonials;
      },
      error: (err) => console.error(err)
    });
  }
}