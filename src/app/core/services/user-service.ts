import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { enveronment } from '../../../environments/env';
import { IUserListRes } from '../models/user.model';

@Service()
export class UserService {
  private _http = inject(HttpClient);
  private _apiURL = enveronment.apiURL + 'user';

  getAllUsers() {
    return this._http.get<IUserListRes>(this._apiURL);
  }
  getMyProfile() {
  return this._http.get<any>(this._apiURL + '/profile');
}

updateMyProfile(data: any) {
  return this._http.put<any>(this._apiURL + '/profile', data);
}
}