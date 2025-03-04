import { Person } from './../_models/person';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { PersonsService } from '../_services/persons.service';

@Component({
	selector: 'app-persons',
	standalone: false,
	templateUrl: './persons.component.html',
	styleUrl: './persons.component.scss'
})
export class PersonsComponent {
	persons: Person[] = [];
  // pagination: Pagination | undefined;
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }]
	constructor(private http: HttpClient,
		private router: Router,
		public personsService: PersonsService,
	) { }

	ngOnInit(): void {
    // this.member$ = this.memberService.getMembers();
    this.loadMembers()
  }

  loadMembers() {
    this.personsService.getMembers().subscribe({
      next: response => {
        this.persons = response;
      }
    })
  }


  // pageChanged(event: any) {
  //   if (this.userParams && this.userParams?.pageNumber !== event.page) {
  //     this.memberService.setUserParams(this.userParams);
  //     this.userParams.pageNumber = event.page;
  //     this.loadMembers();
  //   }
  // }
}
