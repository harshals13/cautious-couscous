import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  restaurants = [];
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getUsersFavouriteRestaurant();
  }

  getUsersFavouriteRestaurant() {
    this.authService.getUsersFavourite(localStorage.email).subscribe((data) => {
      console.log(data);
    });
  }
}
