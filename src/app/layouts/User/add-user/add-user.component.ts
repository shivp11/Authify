import { Component,Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserinfoComponent } from '../userinfo/userinfo.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  constructor(
    private auth: AuthenticationService ,private toastr: ToastrService,
    private router: Router, private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<UserinfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {}
    
  userToUpdate = {
    id: "",
    name: "",
    email: "",
  }

  ngOnInit(): void {
  }

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

  addUser(form: NgForm) {
    // console.log(form);
    const name = form.value.name;
    const email = form.value.email;
    const role = form.value.role;
    this.spinner.show();
    this.auth.addUser(this.userToUpdate.id, name, email, role).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe(
      (resp) => {
        this.data = resp;
        if (this.data.code == '200') {
          this.toastr.success(this.data.message);
        }
        this.onNoClick();
      },
      (err) => {
        console.log(err.error.errors);
        if (this.data.code == 402) {
          this.toastr.error(this.data.message);
        }
        if (err) {
          this.toastr.error(err.error.errors.email);
        }
        this.onNoClick();
      }
    );
  }
  
  onNoClick(): void {
    this.auth.filter('Add New User..!!');
    this.dialogRef.close();
  }
}
