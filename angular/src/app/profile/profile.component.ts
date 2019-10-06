import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  restaurants = [];
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.checkForLoggedInUser();
  }

  checkForLoggedInUser() {
    if (localStorage.isLoggedIn !== 'true') {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }

  getUsersFavouriteRestaurant() {
    this.authService.getUsersFavourite(localStorage.email).subscribe((data) => {
      console.log(data);
    });
  }
}
