import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { PersonsComponent } from './persons/persons.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonCardComponent } from './persons/person-card/person-card.component';
import { PersonDetailsComponent } from './persons/person-details/person-details.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploadModule } from 'ng2-file-upload';
import { DatePipe } from '@angular/common';
import { AddPersonComponent } from './persons/add-person/add-person.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PersonsComponent,
    TextInputComponent,
    PersonCardComponent,
    PersonDetailsComponent,
    AddPersonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
    NgSelectModule,
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
  ],
  providers: [provideHttpClient(), DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
