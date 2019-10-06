import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public options: {};

  constructor(private http: HttpClient) { }

  login(data): Observable< any > {
    const responseType = 'json';
    this.options = {
      responseType
    };
    return this.http.post(AppConfig.baseUrlV1 + '/user/login', data, this.options)
    .pipe();
  }
}
