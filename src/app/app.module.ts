import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Auth/home/home.component';
import { LoginComponent } from './Auth/login/login.component';
import { LogoutComponent } from './Auth/logout/logout.component';
import { RegisterComponent } from './Auth/register/register.component';
import { ForgotPasswordComponent } from './Auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component';
import { DashboardComponent } from './Auth/dashboard/dashboard.component';
import { NavbarComponent } from './Auth/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ProfileComponent } from './layouts/User/profile/profile.component';
import { UserinfoComponent } from './layouts/User/userinfo/userinfo.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { AddUserComponent } from './layouts/User/add-user/add-user.component';
import { UpdateUserComponent } from './layouts/User/update-user/update-user.component';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { DeleteUserComponent } from './layouts/User/delete-user/delete-user.component';
import { ManagePostComponent } from './layouts/Post/manage-post/manage-post.component';
import { AddPostComponent } from './layouts/Post/Modal/add-post/add-post.component';
import { UpdatePostComponent } from './layouts/Post/Modal/update-post/update-post.component';
import { DeletePostComponent } from './layouts/Post/Modal/delete-post/delete-post.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DashboardComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    UserinfoComponent,
    SidebarComponent,
    AddUserComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    ManagePostComponent,
    AddPostComponent,
    UpdatePostComponent,
    DeletePostComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    }),
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
