import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  login(value) {
    this.authService.login(value).subscribe((data) => {
      console.log(data);
      const user = JSON.stringify(data.responde);
      if (data.response.email) {
        localStorage.setItem('email', data.response.email);
        localStorage.setItem('name', data.response.name);
        localStorage.setItem('mobile', data.response.mobile);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', user);
        this.router.navigate(['/home']);
      }
    });
  }



}
