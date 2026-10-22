import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.services';
import { SubCategoryService } from '../../core/services/subcategory.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  private _productService = inject(ProductService);
  private _categoryService = inject(CategoryService);
  private _subCategoryService = inject(SubCategoryService);
  private _cdr = inject(ChangeDetectorRef);

  products: any[] = [];
  categories: any[] = [];
  subCategories: any[] = [];

  newProduct = {
    name: '',
    desc: '',
    price: null,
    stock: null,
    category: '',
    subCategory: '',
    gender: 'men'
  };
  
  selectedFile: File | null = null;

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadSubCategories();
  }

  loadProducts() {
    this._productService.getAdminProducts().subscribe({
      next: (res: any) => {
        this.products = res.data;
        this._cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  loadCategories() {
    this._categoryService.getAdminCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data;
        this._cdr.detectChanges();
      }
    });
  }

  loadSubCategories() {
    this._subCategoryService.getAdminSubCategories().subscribe({
      next: (res: any) => {
        this.subCategories = res.data;
        this._cdr.detectChanges();
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  addProduct() {
    if (!this.newProduct.name || !this.newProduct.price || !this.selectedFile) {
      alert('Please fill required fields and select an image.');
      return;
    }

    const formData = new FormData();
formData.append('name', this.newProduct.name);
formData.append('desc', this.newProduct.desc);
formData.append('price', String(this.newProduct.price || 0));
formData.append('stock', String(this.newProduct.stock || 0));
formData.append('category', this.newProduct.category);
formData.append('subCategory', this.newProduct.subCategory);
formData.append('gender', this.newProduct.gender);
formData.append('imgURL', this.selectedFile);
    this._productService.addProduct(formData).subscribe({
      next: () => {
        alert('Product added successfully!');
        this.loadProducts();
        this.resetForm();
      },
      error: (err: any) => alert(err.error?.message || 'Error adding product')
    });
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this._productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts(),
        error: (err: any) => alert(err.error?.message || 'Error deleting product')
      });
    }
  }

  resetForm() {
    this.newProduct = { name: '', desc: '', price: null, stock: null, category: '', subCategory: '', gender: 'men' };
    this.selectedFile = null;
  }
}