import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  baseUrl = environment.apiUrl;
  model: any = {};
  constructor(private http: HttpClient,
    private router: Router,
    public accountService: AccountService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/persons');
        this.model = {}
      },
      error: error => {
        console.error(error);
        this.toastr.error(error.error.title, 'Login failed');
      }
    });
  }

  openSignUp() {
    this.router.navigate(['/register']);
  }
}
