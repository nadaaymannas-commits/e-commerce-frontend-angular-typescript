import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { enveronment } from '../../../environments/env';

@Service()
export class TestimonialService {
  private _http = inject(HttpClient);
  private _apiURL = enveronment.apiURL + 'testimonial';

  getApprovedTestimonials() {
    return this._http.get(this._apiURL);
  }

  getAllTestimonials() {
    return this._http.get(this._apiURL + '/admin');
  }

  updateTestimonialStatus(id: string, status: string) {
    return this._http.patch(this._apiURL + '/' + id + '/status', { status });
  }
}