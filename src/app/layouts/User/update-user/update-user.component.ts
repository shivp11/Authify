import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from '../userinfo/user.model';
import { UserinfoComponent } from '../userinfo/userinfo.component';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  constructor(
    private auth: AuthenticationService, private toastr: ToastrService, 
    private spinner: NgxSpinnerService, public dialogRef: MatDialogRef<UserinfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.getLoggedInUser();
    }

  // imagePath:any = "http://172.16.4.225:8080/angular/images/"
  imagePath?: any = "http://127.0.0.1:8000/angular/images/"
  
  ngOnInit(): void { 
    this.getLoggedInUser();
  }

  LoggedInUserID: any;
  getLoggedInUser(){
    const user: any = localStorage?.getItem('user');
    const userObj: any = JSON?.parse(user);
    this.LoggedInUserID = userObj.data.id;
    // console.log(userObj.data.id); 
  }


  user = new User();
  userDetails = null as any;
  getUsersDetails() {
    this.spinner.show();
    this.auth.getUsers().pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe(
      (resp) => {
        // console.log(resp);
        this.userDetails = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  file: any
  ImageUpload(event: any) {
    this.file = event.target.files[0];
    // console.log(this.file);
  }

  updateUser(form: NgForm) {
    // console.log(form);    
    const formData = new FormData();
    if (this.file) {
      formData.append("profile", this.file, this.file.name);
    }
    formData.append("name", form.value.name);
    formData.append("email", form.value.email);
    formData.append("role", form.value.role);
    this.spinner.show();
    this.auth.updateUsers(this.data.id, formData).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe(
      (resp) => {
        // console.log(resp);
        this.data = resp;
        this.user.name = '';
        this.user.email = '';
        this.user.role = '';

        if (this.data.code == 200) {
          this.toastr.success(this.data.message);
        }
        this.onNoClick();
      },
      (err: any) => {
        this.toastr.success(this.data.message);
        console.log(err);
        if (this.data.code == 402) {
          this.toastr.error(this.data.message);
        }
        if (err) {
          this.toastr.error('Something Went worng please try again!!!');
        }
        this.onNoClick();
      }
    );
  }

  onNoClick(): void {
    this.auth.filter('Updated User..!!');
    this.dialogRef.close();
  }
}
