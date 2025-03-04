import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../../_models/person';
import { FormGroup, NgForm } from '@angular/forms';
import { PersonsService } from '../../_services/persons.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';


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
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  formData: FormData | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private personsService: PersonsService) { }

  ngOnInit(): void {
    const personId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (personId) {
      this.personsService.getPerson(personId).subscribe(person => {
        this.person = person;
        this.person.dateOfBirth = new Date(this.person.dateOfBirth);
        this.userName = this.person.firstName;
        this.age = this.calculateAge(this.person.dateOfBirth);      });
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


  getImages() {
    if (!this.person) return;
    // for (const photo of this.person?.photos) {
    //     // this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }));
    // }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Preview the selected image
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }

  // Upload the file
  uploadFile() {
    if (!this.selectedFile) {
      alert('Please select a file first.');
      return;
    }

    this.formData = new FormData();
    this.formData.append('file', this.selectedFile);

    this.personsService.uploadImage(this.formData, this.person.id).subscribe(res => {
      this.person.photo = environment.apiUrl + res;
      this.formData = undefined;
      this.previewUrl = null;
    });
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
