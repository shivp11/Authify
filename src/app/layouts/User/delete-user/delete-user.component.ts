import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserinfoComponent } from '../userinfo/userinfo.component';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent  implements OnInit{
  constructor(private auth: AuthenticationService, private toastr: ToastrService,
    public dialogRef: MatDialogRef<UserinfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  ngOnInit(): void {}

  deleteUser(form: NgForm) {
    // console.log(form);
    this.auth.deleteUser(this.data.id).subscribe(
      (resp) => {
        this.data = resp;
        if (this.data.status == 200) {
          this.toastr.success(this.data.message);
        }
        this.onNoClick();
      },
      (err) => {
        console.log(err);
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
