import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(
      'https://localhost:44337/WeatherForecast').subscribe(
        (response) => {
          console.log(response);
        });
  }

  onSubmit(form: NgForm) {
    console.log(form);
    // Handle the login logic here
    console.log('Form submitted');
  }

  openSignUp() {
    // Handle the sign up logic here
    console.log('Sign up clicked');
  }

}
