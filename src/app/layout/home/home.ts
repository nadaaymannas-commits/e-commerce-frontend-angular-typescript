import { CategoryService } from './../../core/services/category.services';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../productslist/product/product';
import { ProductService } from '../../core/services/product.service';
import { IProduct } from '../../core/models/product.model';
import { ICategory } from '../../core/models/category.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Product, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private _productService = inject(ProductService);
  private _categoryService = inject(CategoryService);

  products = signal<IProduct[]>([]);
  categories = signal<ICategory[]>([]);

  ngOnInit(): void {
    this._productService.getAllProducts().subscribe({
      next: (res: any) => {
        const trendingProducts = res.data.filter((p: any) => p.isTrending === true);
        this.products.set(trendingProducts.slice(0, 8));
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
  }
}