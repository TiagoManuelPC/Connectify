import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { of, map, take } from 'rxjs';
import { AccountService } from './account.service';
import { environment } from '../../environments/environment';
import { Person } from '../_models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);

  baseUrl = environment.apiUrl;
  persons: Person[] = [];
  user = this.accountService.currentUser();

  constructor() {
  }

  getPersons() {
    return this.http.get<Person[]>(this.baseUrl + 'Persons/GetPersons').pipe(
      map(response => {
        return response;
      })
    )
  }

  getPerson(id: number) {
    return this.http.get<Person>(`${this.baseUrl}Persons/GetPerson/${id}`).pipe(
      map(response => {
        return response;
      })
    )
  }

  updatePerson(person: Person) {
    return this.http.put<void>(`${this.baseUrl}Persons/UpdatePerson/${person.id}`, person).pipe(
      map(() => {
        const index = this.persons.indexOf(person);
        this.persons[index] = { ...this.persons[index], ...person }
      })
    )
  }

  createPerson(person: Person) {
    return this.http.post<Person>(`${this.baseUrl}Persons/CreatePerson`, person).pipe(
      map(() => {
      })
    )
  }

  deletePerson(id: number) {
    return this.http.delete<void>(`${this.baseUrl}Persons/DeletePerson/${id}`).pipe(
      map(() => {
        this.persons = this.persons.filter(x => x.id !== id);
      })
    )
  }
}
