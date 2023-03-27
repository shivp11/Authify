import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserinfoComponent } from '../userinfo/userinfo.component';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  constructor(
    private auth: AuthenticationService, private toastr: ToastrService,
    public dialogRef: MatDialogRef<UserinfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

  }

  updateUser(form: NgForm) {
    // console.log(form);    
    const name = form.value.name;
    const email = form.value.email;
    const role = form.value.role;
    // console.log(this.data.id);

    this.auth.updateUsers(this.data.id, name, email, role).subscribe(
      (resp) => {
        this.data = resp;
        if (this.data.status == 200) {
          this.toastr.success(this.data.message);
        }
        this.onNoClick();
      },
      (err) => {
        this.toastr.success(this.data.message);
        console.log(err);
        if (this.data.status == 402) {
          this.toastr.error(this.data.message);
        }
        if (err) {
          this.toastr.error('Something Went worng please try again!!!');
        }
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
