import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../../_models/person';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { PersonsService } from '../../_services/persons.service';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'app-person-details',
    standalone: false,
    templateUrl: './person-details.component.html',
    styleUrl: './person-details.component.scss'
})
export class PersonDetailsComponent {
    @ViewChild('editForm') editForm!: NgForm;
    person: Person = {} as Person;
    genderList = [
        { id: 1, name: 'Female' },
        { id: 2, name: 'Male' }
    ];

    form: FormGroup = new FormGroup({});
    validationErrors: string[] | undefined;

    userName: string = '';
    age: number | undefined;
    bsConfig = {
        containerClass: 'theme-red',
        dateInputFormat: 'DD MMMM YYYY',
    }
    formattedDate: any;;

    // images: GalleryItem[] = [];

    constructor(private route: ActivatedRoute,
        private router: Router,
        private personsService: PersonsService,
        private datePipe: DatePipe) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (params['data']) {
                this.person = JSON.parse(params['data']);
                this.userName = this.person.firstName;
                this.age = this.calculateAge(this.person.dateOfBirth);
                this.formattedDate = this.formatDate(this.person.dateOfBirth);
            }
        });
    }


    calculateAge(birthday: Date): number {
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    formatDate(date: Date): string {
        return this.datePipe.transform(date, 'yyyy-MM-dd')!;
    }


    getImages() {
        if (!this.person) return;
        // for (const photo of this.person?.photos) {
        //     // this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }));
        // }
    }

    updatePerson() {
        this.personsService.updatePerson(this.person).subscribe({
            next: _ => {
                this.editForm.reset(this.person);
                this.router.navigate(['/persons']);
            }
        });
    }

    onDateChange($event: Date) {
        this.person.dateOfBirth = $event;
        this.age = this.calculateAge(this.person.dateOfBirth);
    }

    back() {
        this.router.navigate(['/persons']);
    }
}
