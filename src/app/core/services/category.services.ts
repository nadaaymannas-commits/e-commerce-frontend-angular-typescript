import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { enveronment } from '../../../environments/env';
import { ICategoriesListRes, ICategoryRes } from '../models/category.model';

@Service()
export class CategoryService {
    private _http = inject(HttpClient);
    private _apiURL = enveronment.apiURL + 'category';
    getAllCategories() {
        return this._http.get<ICategoriesListRes>(this._apiURL);
    }
    getAdminCategories() {
        return this._http.get<ICategoriesListRes>(this._apiURL + '/admin/all');
    }
    getCategoryById(id: string) {
        return this._http.get<ICategoryRes>(this._apiURL + '/' + id);
    }
    addCategory(data: { name: string }) {
        return this._http.post<ICategoryRes>(this._apiURL, data);
    }
    updateCategory(id: string, data: { name?: string, isActive?: boolean }) {
        return this._http.put<ICategoryRes>(this._apiURL + '/' + id, data);
    }
    deleteCategory(id: string) {
        return this._http.delete<{ message: string }>(this._apiURL + '/' + id);
    }



    
}