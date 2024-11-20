import { CommonModule, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterModel } from '../../models/RegisterModel';
import { LoginModel } from '../../models/LoginModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

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
  authService = inject(AuthService);

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
    const contactNo: string = Math.round((Math.random() * 100) + 100).toString();

    var registerRequest = new RegisterModel();
    registerRequest.name = this.registerModel.username;
    registerRequest.username = this.registerModel.username;
    registerRequest.email = this.registerModel.email;
    registerRequest.phoneNumber = contactNo;
    registerRequest.password = this.registerModel.password;
    registerRequest.role = "User";

    this.authService.register(registerRequest)
      .subscribe({
        next: (response: any) => {
          if (!response.error) {
            this.snackBar.open(response.data, 'Close', { duration: 3000 });
            this.registerModel = new RegisterModel();
            this.loginTextBtn();
          } else {
            this.snackBar.open(response.message, 'Close', { duration: 3000 });
          }
        },
        error: (err: any) => {
          this.snackBar.open(err.message, 'Close', { duration: 3000 });
        }
      });
  }

  loginBtn() {
    this.authService.login(this.loginModel)
      .subscribe({
        next: (response: any) => {
          if (!response.error) {
            this.snackBar.open("Login successfully.", 'Close', { duration: 3000 });
          } else {
            this.snackBar.open(response.message, 'Close', { duration: 3000 });
          }
        },
        error: (err: any) => {
          this.snackBar.open(err.message, 'Close', { duration: 3000 });
        }
      });
  }

}