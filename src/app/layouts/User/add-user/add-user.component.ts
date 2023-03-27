import { Component,Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserinfoComponent } from '../userinfo/userinfo.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  firstName;
  constructor(
    private auth: AuthenticationService ,private toastr: ToastrService,private router: Router,
    public dialogRef: MatDialogRef<UserinfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {
      this.firstName = data.name
  }
  userToUpdate = {
    id: "",
    name: "",
    email: "",
  }

  ngOnInit(): void {
    this.getUsersDetails();
  }

  userDetails = null as any;
  getUsersDetails() {
    this.auth.getUsers().subscribe(
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
    this.auth.addUser(this.userToUpdate.id, name, email, role).subscribe(
      (resp) => {
        this.data = resp;
        if (this.data.status == 200) {
          this.toastr.success(this.data.message);
        }
        this.onNoClick();
      },
      (err) => {
        console.log(err.error.errors);
        if (this.data.status == 402) {
          this.toastr.error(this.data.message);
        }
        if (err) {
          this.toastr.error(err.error.errors.email);
        }
      }
    );
  }
  onNoClick(): void {
    this.getUsersDetails();
    this.dialogRef.close();
  }
}
