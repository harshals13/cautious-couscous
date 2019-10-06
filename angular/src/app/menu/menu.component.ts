import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLoggedIn: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = localStorage.isLoggedIn;
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
