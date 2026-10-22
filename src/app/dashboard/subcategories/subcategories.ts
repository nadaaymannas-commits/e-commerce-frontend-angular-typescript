import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../core/services/category.services';
import { SubCategoryService } from '../../core/services/subcategory.service';
@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subcategories.html',
  styleUrl: './subcategories.css'
})
export class Subcategories implements OnInit {
  private _subCategoryService = inject(SubCategoryService);
  private _categoryService = inject(CategoryService);
  private _cdr = inject(ChangeDetectorRef);

  subCategories: any[] = [];
  categories: any[] = [];
  
  newSubCategoryName: string = '';
  selectedCategoryId: string = '';

  ngOnInit(): void {
    this.loadCategories();
    this.loadSubCategories();
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

  loadSubCategories() {
    this._subCategoryService.getAdminSubCategories().subscribe({
      next: (res: any) => {
        this.subCategories = res.data;
        this._cdr.detectChanges();
      },
      error: (err: any) => console.error(err)
    });
  }

  addSubCategory() {
    if (!this.newSubCategoryName.trim() || !this.selectedCategoryId) return;

    const data = {
      name: this.newSubCategoryName,
      category: this.selectedCategoryId
    };

    this._subCategoryService.addSubCategory(data).subscribe({
      next: () => {
        this.newSubCategoryName = '';
        this.selectedCategoryId = '';
        this.loadSubCategories();
      },
      error: (err: any) => alert(err.error?.message || 'Error adding subcategory')
    });
  }

  deleteSubCategory(id: string) {
    if (confirm('Are you sure you want to delete this subcategory?')) {
      this._subCategoryService.deleteSubCategory(id).subscribe({
        next: () => this.loadSubCategories(),
        error: (err: any) => alert(err.error?.message || 'Error deleting subcategory')
      });
    }
  }
}