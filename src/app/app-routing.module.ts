import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: environment.url.components.login, pathMatch: 'full' },
  /* { path: '**', component: NotFoundComponent }, */
  { path: environment.url.components.login, component: LoginComponent },
  { path: environment.url.components.users, component: UserListComponent },
  {
    path: environment.url.components.sign_up,
    component: SignUpComponent,
  },
  /* {path: environment.url.components.users_details, component: UserDetailComponent}, */
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
