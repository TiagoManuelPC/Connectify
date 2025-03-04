import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../../_models/person';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { PersonsService } from '../../_services/persons.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';


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
    const personId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (personId) {
      this.personsService.getPerson(personId).subscribe(person => {
        this.person = person;
        this.person.dateOfBirth = new Date(this.person.dateOfBirth);
        this.userName = this.person.firstName;
        this.age = this.calculateAge(this.person.dateOfBirth);
        this.formattedDate = this.formatDate(this.person.dateOfBirth);
      });
    }
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

  updatePerson(form: NgForm) {
    if (form.invalid) return;
    this.personsService.updatePerson(this.person).subscribe({
      next: _ => {
        this.editForm.reset(this.person);
        this.back();
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

  deletePerson(person: Person) {
    this.personsService.deletePerson(person.id).subscribe(res => {

    });
  }

  confirmAction() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePerson(this.person!);
      }
    });
  }
}
