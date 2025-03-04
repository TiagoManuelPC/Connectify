import { Component, Input } from '@angular/core';
import { Person } from '../../_models/person';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { Photo } from '../../_models/photo';
import { PersonsService } from '../../_services/persons.service';
import { User } from '../../_models/user';

@Component({
  selector: 'app-photo-editor',
  standalone: false,
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.scss'
})
export class PhotoEditorComponent {
  @Input() person!: Person;
  uploader: FileUploader | undefined;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User | null = null;
  constructor(private personsService: PersonsService) { }
  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    // this.personsService.setMainPhoto(photo.id).subscribe({
    // 	next: _ => {
    // 		if (this.person) {
    // 			this.person.photo = photo.url;
    // 			this.person.photos.forEach(p => {
    // 				if (p.isMain) p.isMain = false;
    // 				if (p.id === photo.id) p.isMain = true;
    // 			})
    // 		}
    // 	}
    // })
  }

  deletePhoto(photoId: number) {
    // this.personsService.deletePhoto(photoId).subscribe({
    // 	next: _ => {
    // 		if (this.person) {
    // 			this.person.photos = this.person?.photos.filter(x => x.id !== photoId)
    // 		}
    // 	}
    // })
  }

  initializeUploader() {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.person?.photos.push(photo);
        if (photo.isMain && this.person) {
          this.person.photo = photo.url;
        }
      }
    }
  }
}
