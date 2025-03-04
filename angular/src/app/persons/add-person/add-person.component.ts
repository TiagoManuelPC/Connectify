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
    this.person.photo = this.person.photo ?? 'https://res.cloudinary.com/dkqohzjzg/image/upload/v1628581314/blank-profile-picture-973460_640_1_vzqz9c.png';
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
