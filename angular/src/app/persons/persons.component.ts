import { Person } from './../_models/person';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { PersonsService } from '../_services/persons.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-persons',
  standalone: false,
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.scss'
})
export class PersonsComponent {
  persons: Person[] = [];
  constructor(public personsService: PersonsService) { }

  ngOnInit(): void {
    this.loadPersons()
  }

  loadPersons() {
    this.personsService.getPersons().subscribe({
      next: response => {
        this.persons = response;
      }
    })
  }
}
