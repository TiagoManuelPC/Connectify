import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'services', component: ServicesComponent },
  // { path: 'blog', component: BlogComponent },
  // { path: 'contact', component: ContactsComponent },
  // { path: '', component: HomeComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/' } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
