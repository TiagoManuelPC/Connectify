import { Component } from '@angular/core';
import { Person } from '../../_models/person';
import { Router } from '@angular/router';
import { PersonsService } from '../../_services/persons.service';

@Component({
  selector: 'app-add-person',
  standalone: false,
  templateUrl: './add-person.component.html',
  styleUrl: './add-person.component.scss'
})
export class AddPersonComponent {
  person: Person = {} as Person;
  genderList = [
    { id:
      1, name: "Female" },
    { id:
      2, name: "Male" }
  ];

  constructor(private router: Router, private personsService: PersonsService) {}

  createPerson() {
    this.person.id = 0;
    this.person.photo = 'https://randomuser.me/api/portraits/lego/7.jpg';
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
