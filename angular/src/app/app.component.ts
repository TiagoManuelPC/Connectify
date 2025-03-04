import { Component } from '@angular/core';
import { AccountService } from './_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(public accountService: AccountService,
    private router: Router) { }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

  addPerson() {
    this.router.navigate(['/add-person'])
  }
}
