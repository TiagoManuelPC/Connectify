import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
	selector: 'app-members',
	standalone: false,
	templateUrl: './members.component.html',
	styleUrl: './members.component.scss'
})
export class MembersComponent {
	baseUrl = environment.apiUrl;
	model: any = {};
	constructor(private http: HttpClient,
		private router: Router,
		public accountService: AccountService,
	) { }

	ngOnInit(): void {
	}
}
