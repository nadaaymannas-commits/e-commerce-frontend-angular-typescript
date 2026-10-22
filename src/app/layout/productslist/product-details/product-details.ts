import { CartService } from '../../../core/services/cart.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../core/models/product.model';
import { enveronment } from '../../../../environments/env';
import { Product } from '../product/product';

@Component({
  imports: [Product],
  selector: 'app-product-details',
  styleUrl: './product-details.css',
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {

  myProduct!: IProduct;
  relatedProducts!: IProduct[];
  staticURL = enveronment.staticURL;

  constructor(
    private _productService: ProductService, 
    private _cdr: ChangeDetectorRef, 
    private _activatedRouter: ActivatedRoute,
    private _cartService: CartService
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
}