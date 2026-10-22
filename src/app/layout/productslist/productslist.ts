import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { IProduct } from '../../core/models/product.model';
import { Product } from './product/product';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [Product, FormsModule],
  selector: 'app-productslist',
  styleUrl: './productslist.css',
  templateUrl: './productslist.html',
})
export class Productslist implements OnInit, OnDestroy {
  
  private _productService = inject(ProductService);
  private _cdr = inject(ChangeDetectorRef);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  products: IProduct[] = [];
  
  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 1;

  private _subscribtions = new Subscription();

  ngOnInit(): void {
    const routeSub = this._route.queryParams.subscribe(params => {
      const categoryId = params['category'];
      this.searchQuery = params['search'] || '';
      this.currentPage = Number(params['page']) || 1;

      const getProducts = this._productService.getAllProducts({
        search: this.searchQuery,
        page: this.currentPage,
        category: categoryId
      }).subscribe({
        next: (res: any) => {
          this.products = res.data;
          this.totalPages = res.totalPages || 1;
          this._cdr.detectChanges();
        },
        error: (error) => {
          console.log(error);
        }
      });

      this._subscribtions.add(getProducts);
    });

    this._subscribtions.add(routeSub);
  }

  onSearch() {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: { search: this.searchQuery || null, page: 1 },
      queryParamsHandling: 'merge',
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this._router.navigate([], {
        relativeTo: this._route,
        queryParams: { page: page },
        queryParamsHandling: 'merge',
      });
    }
  }

  ngOnDestroy(): void {
    this._subscribtions.unsubscribe();
  }
}