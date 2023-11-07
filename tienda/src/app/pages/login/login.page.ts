import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  emailError: boolean = false;
  passwordError: boolean = false;

  constructor(private router: Router) {}

  login() {
    this.emailError = !this.isValidEmail(this.email);
    this.passwordError = !this.password || this.password.length < 8;

    if (!this.emailError && !this.passwordError) {
      this.router.navigate(['/products']);
    } else {
      console.log('Error: Correo electrónico no válido o contraseña no cumple con los requisitos.');
    }
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  ngOnInit() {
  }
}
