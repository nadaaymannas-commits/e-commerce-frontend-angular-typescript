import { CategoryService } from './../../core/services/category.services';
import { ICategory } from './../../core/models/category.model';
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories implements OnInit {
  private _categoryService = inject(CategoryService);
  private _cdr = inject(ChangeDetectorRef);

  categories: ICategory[] = [];
  newCategoryName: string = '';

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this._categoryService.getAdminCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data;
        this._cdr.detectChanges();
      },
      error: (err: any) => console.error(err)
    });
  }

  addCategory() {
    if (!this.newCategoryName.trim()) return;

    this._categoryService.addCategory({ name: this.newCategoryName }).subscribe({
      next: () => {
        this.newCategoryName = '';
        this.loadCategories();
      },
      error: (err: any) => alert(err.error?.message || 'Error adding category')
    });
  }

  deleteCategory(id: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      this._categoryService.deleteCategory(id).subscribe({
        next: () => this.loadCategories(),
        error: (err: any) => alert(err.error?.message || 'Error deleting category')
      });
    }
  }
}