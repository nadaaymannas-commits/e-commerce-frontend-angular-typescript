import { CategoryService } from './../../core/services/category.services';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../productslist/product/product';
import { ProductService } from '../../core/services/product.service';
import { IProduct } from '../../core/models/product.model';
import { ICategory } from '../../core/models/category.model';
import { RouterLink } from '@angular/router';
import { TestimonialService } from '../../core/services/testimonial.service';

@Component({
  selector: 'app-home',
  imports: [Product, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private _productService = inject(ProductService);
  private _categoryService = inject(CategoryService);
  private _testimonialService = inject(TestimonialService);

  products = signal<IProduct[]>([]);
  categories = signal<ICategory[]>([]);
  testimonials = signal<any[]>([]);

  ngOnInit(): void {
    this._productService.getAllProducts().subscribe({
      next: (res: any) => {
        const trending = res.data.filter((p: any) => p.isTrending === true);
        const womenProducts = res.data.filter((p: any) => p.gender === 'women');
        const menProducts = res.data.filter((p: any) => p.gender === 'men');

        let finalProducts = [...trending];

        if (finalProducts.length < 8) {
          const extraWomen = womenProducts.filter((w: any) => !finalProducts.find((f: any) => f._id === w._id));
          finalProducts = [...finalProducts, ...extraWomen.slice(0, 4)];
        }

        if (finalProducts.length < 8) {
          const extraMen = menProducts.filter((m: any) => !finalProducts.find((f: any) => f._id === m._id));
          finalProducts = [...finalProducts, ...extraMen];
        }

        this.products.set(finalProducts.slice(0, 8));
      },
      error: (err: any) => {
        console.error(err);
      },
    });

    this._categoryService.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories.set(res.data);
      },
      error: (err: any) => {
        console.error(err);
      },
    });

    this._testimonialService.getApprovedTestimonials().subscribe({
      next: (res: any) => {
        this.testimonials.set(res.data.testimonials.slice(0, 3));
      },
      error: (err: any) => console.error(err)
    });
  }
}