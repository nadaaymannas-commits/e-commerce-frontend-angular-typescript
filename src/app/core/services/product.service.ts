import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { enveronment } from '../../../environments/env';
import { IProductRes, IProductsListRes } from '../models/product.model';

@Service()
export class ProductService {

    private _http = inject(HttpClient);
    private _apiURL = enveronment.apiURL + 'product';

    getAllProducts(filters?: { search?: string, page?: number, category?: string }) {
        let params = new HttpParams();
        
        if (filters?.search) {
            params = params.set('search', filters.search);
        }
        if (filters?.page) {
            params = params.set('page', filters.page.toString());
        }
        if (filters?.category) {
            params = params.set('category', filters.category);
        }

        return this._http.get<IProductsListRes>(this._apiURL, { params });
    }

    getProductBySlug(slug: string) {
        return this._http.get<IProductRes>(this._apiURL + '/' + slug);
    }

    getRelatedProducts(slug: string) {
        return this._http.get<IProductsListRes>(this._apiURL + '/related-products/' + slug);
    }

    getTrendingProducts() {
        return this._http.get<IProductsListRes>(this._apiURL + '?trending=true');
    }
getAdminProducts() {
  return this._http.get<IProductsListRes>(this._apiURL);
}
  addProduct(formData: FormData) {
    return this._http.post(this._apiURL, formData);
  }


  deleteProduct(id: string) {
    return this._http.delete(this._apiURL + '/' + id);
  }
updateProductPrice(id: string, price: number) {
  return this._http.patch(this._apiURL + '/' + id + '/price', { price });
}
}