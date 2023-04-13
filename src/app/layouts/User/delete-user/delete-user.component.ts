import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserinfoComponent } from '../userinfo/userinfo.component';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent  implements OnInit{
  constructor(private auth: AuthenticationService, private toastr: ToastrService,
    private spinner: NgxSpinnerService, public dialogRef: MatDialogRef<UserinfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  ngOnInit(): void {}

  deleteUser(form: NgForm) {
    // console.log(form);
    this.spinner.show();
    console.log(this.data.id);
    
    this.auth.deleteUser(this.data.id).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe(
      (resp) => {
        console.log(resp);
        
        this.data = resp;
        if (this.data.code == 200) {
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
    this.auth.filter('Add New User..!!');
    this.dialogRef.close();
  }
}
