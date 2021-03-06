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

  register(data): Observable< any > {
    const responseType = 'json';
    this.options = {
      responseType
    };
    return this.http.post(AppConfig.baseUrlV1 + '/user', data, this.options)
    .pipe();
  }

  getCities(): Observable< any > {
    const responseType = 'json';
    this.options = {
      responseType
    };
    return this.http.get(AppConfig.baseUrlV1 + '/city', this.options)
    .pipe();
  }

  getCollections(cityId): Observable< any > {
    const responseType = 'json';
    this.options = {
      responseType
    };
    return this.http.get(AppConfig.baseUrlV1 + `/city/${cityId}/collections`, this.options)
    .pipe();
  }

  getRestaurants(cityId, pageNumber, keyword): Observable< any > {
    const responseType = 'json';
    this.options = {
      responseType
    };
    return this.http.get(AppConfig.baseUrlV1 + `/restaurant?cityId=${cityId}&pagenumber=${pageNumber}&keyword=${keyword}`, this.options)
    .pipe();
  }

  setRestaurantAsFavourite(restaurantId, email): Observable< any > {
    const responseType = 'json';
    this.options = {
      responseType
    };
    return this.http.post(AppConfig.baseUrlV1 + `/restaurant/favourite?res_id=${restaurantId}&email=${email}`, null, this.options)
    .pipe();
  }

  getUsersFavourite(email): Observable< any > {
    const responseType = 'json';
    this.options = {
      responseType
    };
    return this.http.get(AppConfig.baseUrlV1 + `/restaurant/favourites?email=${email}`, this.options)
    .pipe();
  }

  bookRestaurant(data): Observable< any > {
    const responseType = 'json';
    this.options = {
      responseType
    };
    return this.http.post(AppConfig.baseUrlV1 + `/booking/`, data, this.options)
    .pipe();
  }

  getAllBookingDetails(email): Observable< any > {
    const responseType = 'json';
    this.options = {
      responseType
    };
    return this.http.get(AppConfig.baseUrlV1 + `/booking/?email=${email}`, this.options)
    .pipe();
  }
}
