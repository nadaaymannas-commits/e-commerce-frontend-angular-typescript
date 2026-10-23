import { CartService } from '../../../core/services/cart.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../core/models/product.model';
import { enveronment } from '../../../../environments/env';
import { Product } from '../product/product';
import { TestimonialService } from '../../../core/services/testimonial.service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [Product, FormsModule],
  selector: 'app-product-details',
  styleUrl: './product-details.css',
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {

  myProduct!: IProduct;
  relatedProducts!: IProduct[];
  staticURL = enveronment.staticURL;
  
  newReview = { rating: 5, comment: '' };

  constructor(
    private _productService: ProductService, 
    private _cdr: ChangeDetectorRef, 
    private _activatedRouter: ActivatedRoute,
    private _cartService: CartService,
    private _testimonialService: TestimonialService
  ) {}

  ngOnInit(): void {
    this._activatedRouter.paramMap.subscribe(data => {
      const slug = data.get('slug');

      if (slug) {
        this._productService.getProductBySlug(slug).subscribe({
          next: (res) => {
            this.myProduct = res.data;
            this._cdr.detectChanges();
          },
          error: (err) => console.log(err)
        });

        this._productService.getRelatedProducts(slug).subscribe({
          next: (res) => {
            this.relatedProducts = res.data;
            this._cdr.detectChanges();
          },
          error: (err) => console.log(err)
        });
      }
    });
  }

  addToCart() {
    if (this.myProduct) {
      this._cartService.addToCart(this.myProduct, 1);
      alert('Added to cart!');
    }
  }

  submitReview() {
    if (!this.myProduct || !this.newReview.comment) return;

    const reviewData = {
      product: this.myProduct._id,
      rating: this.newReview.rating,
      comment: this.newReview.comment
    };

    this._testimonialService.createTestimonial(reviewData).subscribe({
      next: () => {
        alert('Review submitted for approval!');
        this.newReview.comment = '';
      },
      error: (err: any) => alert(err.error?.message || 'Error submitting review')
    });
  }
}