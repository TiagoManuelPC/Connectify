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
    memberCache = new Map();
    user = this.accountService.currentUser();

    constructor() {
    }

    getMembers() {
        return this.http.get<Person[]>(this.baseUrl + 'Persons/GetPersons').pipe(
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
      console.log(person);
        return this.http.post<Person>(`${this.baseUrl}Persons/CreatePerson`, person).pipe(
            map( () => {
                // this.persons.push(newPerson);
            })
        )
    }

    setMainPhoto(photoId: number) {
        return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
    }

    deletePhoto(photoId: number) {
        return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
    }
}
