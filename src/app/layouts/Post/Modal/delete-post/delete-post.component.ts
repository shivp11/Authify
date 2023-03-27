import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/Post/post.service';
import { ManagePostComponent } from '../../manage-post/manage-post.component';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent implements OnInit{
  constructor(private post:PostService, private toastr: ToastrService,
    public dialogRef: MatDialogRef<ManagePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  ngOnInit(): void {}

  deletePost(form: NgForm) {
    // console.log(form);
    this.post.deletePosts(this.data.id).subscribe(
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
