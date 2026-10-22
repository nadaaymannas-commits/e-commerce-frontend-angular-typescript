import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { enveronment } from '../../../environments/env';

@Service()
export class SubCategoryService {
  private _http = inject(HttpClient);
  private _apiURL = enveronment.apiURL + 'subCategory';

  getAdminSubCategories() {
    return this._http.get(this._apiURL + '/admin/all');
  }

  addSubCategory(data: { name: string, category: string }) {
    return this._http.post(this._apiURL, data);
  }

  deleteSubCategory(id: string) {
    return this._http.delete(this._apiURL + '/' + id);
  }
}