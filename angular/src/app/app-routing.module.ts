import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PersonsComponent } from './persons/persons.component';
import { authGuard } from './_guards/auth.guard';
import { PersonDetailsComponent } from './persons/person-details/person-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'persons/:id', component: PersonDetailsComponent, canActivate: [authGuard] },
  { path: 'persons', component: PersonsComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
