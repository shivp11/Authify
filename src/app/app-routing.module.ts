import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Auth/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './Auth/forgot-password/forgot-password.component';
import { HomeComponent } from './Auth/home/home.component';
import { LoginComponent } from './Auth/login/login.component';
import { LogoutComponent } from './Auth/logout/logout.component';
import { RegisterComponent } from './Auth/register/register.component';
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component';
import { ProfileComponent } from './layouts/User/profile/profile.component';
import { UserinfoComponent } from './layouts/User/userinfo/userinfo.component';
import { AuthGuard } from './services/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { ManagePostComponent } from './layouts/Post/manage-post/manage-post.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'userinfo', component: UserinfoComponent, canActivate: [AuthGuard] },
  { path: 'postinfo', component: ManagePostComponent, canActivate: [AuthGuard] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
  ToastrModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
