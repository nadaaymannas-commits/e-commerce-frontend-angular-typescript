import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { enveronment } from '../../../environments/env';

@Service()
export class OrderService {
  private _http = inject(HttpClient);
  private _apiURL = enveronment.apiURL + 'order';

  getAllOrders(status?: string) {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    
    return this._http.get<any>(this._apiURL, { params });
  }

  updateOrderStatus(id: string, status: string) {
    return this._http.patch(this._apiURL + '/' + id + '/status', { status });
  }
  getMyOrders() {
  return this._http.get<any>(this._apiURL + '/my-orders');
}
createOrder(data: any) {
  return this._http.post(this._apiURL, data);
}
}