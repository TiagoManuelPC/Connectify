import { Component, Input } from '@angular/core';
import { Person } from '../../_models/person';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-card',
  standalone: false,
  templateUrl: './person-card.component.html',
  styleUrl: './person-card.component.scss'
})
export class PersonCardComponent {
  @Input() person: Person | undefined;

  constructor(private router: Router) { }

  viewDetails(person: Person) {
    this.router.navigate(['/persons', person.id]);
  }
}
