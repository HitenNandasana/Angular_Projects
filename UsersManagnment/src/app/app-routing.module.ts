import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginauthGuard } from './auth/loginauth.guard';

const routes: Routes = [
  { path: 'login', canActivate: [LoginauthGuard], title: 'Login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', canActivate: [AuthGuard], title: 'Home', component: HomeComponent },
  { path: 'users', canActivate: [AuthGuard], loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'register', canActivate: [LoginauthGuard], title: 'Register', component: RegisterComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
    console.log('app loaded');
  }
}
