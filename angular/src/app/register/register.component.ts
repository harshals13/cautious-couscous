import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  register(value) {
    if (this.registerForm.valid) {
      this.authService.register(value).subscribe((data) => {
        if(data.status === 0) {
          this.router.navigate(['/login']);
        }
      });
    }
  }

}
