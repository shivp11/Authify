import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { PostService } from 'src/app/services/Post/post.service';
import { ManagePostComponent } from '../../manage-post/manage-post.component';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent implements OnInit{
  constructor(private post:PostService, private toastr: ToastrService,
    private spinner: NgxSpinnerService, public dialogRef: MatDialogRef<ManagePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  ngOnInit(): void {}

  deletePost(form: NgForm) {
    // console.log(form);
    this.spinner.show();
    this.post.deletePosts(this.data.id).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe(
      (resp) => {
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
        this.onNoClick();
      }
    );
  }

  onNoClick(): void {
    this.post.filter('Delete Post..!!');
    this.dialogRef.close();
  }
}
