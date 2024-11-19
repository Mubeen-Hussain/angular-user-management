import { CommonModule, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterModel } from '../../models/RegisterModel';
import { LoginModel } from '../../models/LoginModel';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  loginFormMargin: string = "0%";
  loginTextMargin: string = "0%";
  selectedSlide: 'login' | 'signup' = 'login';
  registerModel: RegisterModel = new RegisterModel();
  loginModel: LoginModel = new LoginModel();
  users: RegisterModel[] = [];

  snackBar = inject(MatSnackBar);

  loginTextBtn() {
    this.loginFormMargin = "0%";
    this.loginTextMargin = "0%";
    this.selectedSlide = 'login';
  }

  signUpTextBtn() {
    this.loginFormMargin = "-50%";
    this.loginTextMargin = "-100%";
    this.selectedSlide = 'signup';
  }

  navigateToSignUp(event: Event) {
    event.preventDefault();
    this.signUpTextBtn();
  }

  signUpBtn() {
    // Retrieve data from localStorage
    const local = localStorage.getItem('users');
    if (local != null) {
      // Parse the existing users
      this.users = JSON.parse(local);

      // Check if the user already exists
      const checkUser = this.users.find(x => x.email === this.registerModel.email);
      if (checkUser) {
        this.snackBar.open('User already exist!', 'Close', { duration: 3000 });
        return;
      }

      // Add the new user to the array
      this.users.push(this.registerModel);
    } else {
      // If no users exist, initialize the array with the new user
      this.users = [this.registerModel];
    }

    // Update localStorage with the new users array
    localStorage.setItem('users', JSON.stringify(this.users));


    this.snackBar.open('User registered successfully.', 'Close', { duration: 3000 });

    this.registerModel = new RegisterModel();

    this.loginTextBtn();
  }

  loginBtn() {
    // Retrieve data from localStorage
    const local = localStorage.getItem('users');
    if (local != null) {
      // Parse the existing users
      this.users = JSON.parse(local);

      // Check if the user already exists
      const checkUser = this.users.find(x => x.email === this.loginModel.email && x.password == this.loginModel.password);
      if (!checkUser) {
        this.snackBar.open('Invalid email or password!', 'Close', { duration: 3000 });
        return;
      }

      this.snackBar.open('Login successfully.', 'Close', { duration: 3000 });

      this.loginModel = new LoginModel();
    } else {
      this.snackBar.open('Invalid email or password!', 'Close', { duration: 3000 });
      return;
    }
  }

}