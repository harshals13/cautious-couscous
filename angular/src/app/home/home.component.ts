import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cities = [];
  restaurants = [];
  allBookingDetails = [];
  currentPage = 0;
  currentCity: any;
  keyword: any;
  modalRef: BsModalRef;
  bookingForm: FormGroup;
  selectedRestaurant: any;
  numberOfPeopleError = false;
  guestExceededError = false;
  constructor(private authService: AuthService, private router: Router, private modalService: BsModalService) { }

  ngOnInit() {
    this.getCities();
    this.checkForLoggedInUser();
    this.getAllBookingDetails();
    this.bookingForm = new FormGroup({
      numberOfPeople: new FormControl('', Validators.required),
      bookingTime: new FormControl('', Validators.required)
    });
  }

  getAllBookingDetails() {
    this.authService.getAllBookingDetails(localStorage.email).subscribe((res) => {
      this.allBookingDetails = res.response;
      console.log(this.allBookingDetails);
      this.checkForGuestsExceeded();
    });
  }

  checkForLoggedInUser() {
    if (localStorage.isLoggedIn !== 'true') {
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
  }

  setAsFavourite(restaurantId) {
    this.authService.setRestaurantAsFavourite(restaurantId, localStorage.email).subscribe((data) => {
      console.log(data);
    });
  }

  openBookingModal(template, restaurant) {
    this.bookingForm.reset();
    this.modalRef = this.modalService.show(template);
    this.selectedRestaurant = restaurant;
  }

  confirmBooking(value) {
    if (this.bookingForm.valid && !this.guestExceededError) {
      const data = {
        userEmail: localStorage.email,
        res_id: this.selectedRestaurant.restaurant.id,
        numberOfPeople: value.numberOfPeople,
        bookingTime: value.bookingTime,
        isCompleted: false
      };
      this.authService.bookRestaurant(data).subscribe((res) => {
        if (res.status === 0) {
          this.modalRef.hide();
          this.getAllBookingDetails();
        }
        console.log(res);
      });
    } else {
      if (this.bookingForm.value.numberOfPeople > 6) {
        this.numberOfPeopleError = true;
      }
    }
  }

  checkForGuestsExceeded() {
    let totalGuests = 0;
    for (const booking of this.allBookingDetails) {
      if (booking.isCompleted === false) {
        totalGuests = totalGuests + booking.numberOfPeople;
      }
    }

    if (totalGuests > 20) {
      this.guestExceededError = true;
    }
  }
}
