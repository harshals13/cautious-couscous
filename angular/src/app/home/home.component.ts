import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cities = [];
  restaurants = [];
  currentPage = 0;
  currentCity: any;
  keyword: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getCities();
    this.checkForLoggedInUser();
  }

  checkForLoggedInUser() {
    if (localStorage.isLoggedIn !== 'true'){
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }

  setCityId(event) {
    this.currentCity = event.target.value;
    this.getRestaurants();
  }

  changePageNumber(event) {
    this.currentPage = event.page;
    console.log(this.currentPage);
  }

  getRestaurants() {
    if (this.currentCity) {
      this.authService.getRestaurants(this.currentCity, this.currentPage, this.keyword).subscribe((data) => {
        this.restaurants = data.response.restaurants;
        console.log(data.response);
      });
    }
  }

  getCities() {
    this.authService.getCities().subscribe((data) => {
      this.cities = data.response;
    });
    // const data = {"status":0,"response":[{"_id":"5d987b5757b9e02118b84207","name":"Bengaluru","zomato_id":4},{"_id":"5d987b854e7d0b21182f0221","name":"Chennai","zomato_id":7},{"_id":"5d987b934e7d0b21182f0222","name":"Delhi","zomato_id":1},{"_id":"5d987b9f4e7d0b21182f0223","name":"Mumbai","zomato_id":3},{"_id":"5d98b3ad4e7d0b21182f0224","name":"Hyderabad","zomato_id":6}]}
    // this.cities = data.response
  }

  setAsFavourite(restaurantId) {
    this.authService.setRestaurantAsFavourite(restaurantId, localStorage.email).subscribe((data) => {
      console.log(data);
    });
  }

}
