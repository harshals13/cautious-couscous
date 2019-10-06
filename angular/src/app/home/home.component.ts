import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

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
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getCities();
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
     
      this.restaurants = data.response.restaurants;
      // this.authService.getRestaurants(this.currentCity, this.currentPage).subscribe((data) => {
      //   this.restaurants = data.response.restaurants;
      //   console.log(data.response)
      // });
    }
  }

  getCities() {
    this.authService.getCities().subscribe((data) => {
      this.cities = data.response;
    });
  }

}
