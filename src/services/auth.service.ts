import { inject, Injectable } from '@angular/core';
import { AppConstants } from '../constants/appconstants';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from '../models/RegisterModel';
import { LoginModel } from '../models/LoginModel';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  httpClient = inject(HttpClient);

  register(registerModel: RegisterModel) {
    return this.httpClient.post(AppConstants.BASE_URL + AppConstants.REGISTER_USER, registerModel);
  }

  login(loginModel: LoginModel) {
    return this.httpClient.post(AppConstants.BASE_URL + AppConstants.LOGIN_USER, loginModel);
  }

}
