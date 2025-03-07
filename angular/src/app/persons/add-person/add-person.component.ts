import { Component, OnInit } from '@angular/core';
import { Person } from '../../_models/person';
import { Router } from '@angular/router';
import { PersonsService } from '../../_services/persons.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-person',
  standalone: false,
  templateUrl: './add-person.component.html',
  styleUrl: './add-person.component.scss'
})
export class AddPersonComponent implements OnInit {
  person: Person = {} as Person;
  genderList = [
    {
      id:
        1, name: "Female"
    },
    {
      id:
        2, name: "Male"
    }
  ];

  constructor(private router: Router, private personsService: PersonsService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  createPerson() {
    this.person.id = 0;
    this.person.photo = environment.apiUrl + 'Persons/user.png/Photo';
    this.personsService.createPerson(this.person).subscribe({
      next: response => {
        this.router.navigate(['/persons']);
      },
      error: (error: any) => { console.log(error); }
    });
  }

  back() {
    this.router.navigate(['/persons']);
  }
}
