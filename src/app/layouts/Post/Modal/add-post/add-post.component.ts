import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/Post/post.service';
import { ManagePostComponent } from '../../manage-post/manage-post.component';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  constructor(private post: PostService,
    private spinner: NgxSpinnerService, private router: Router,
    private toastr: ToastrService, public dialogRef: MatDialogRef<ManagePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }


  postToUpdate = {
    id: "",
    name: "",
    email: "",
  }

  addPost(form: NgForm) {
    console.log(form.value);
    const post_title = form.value.post_title;
    const post_author = form.value.post_author;
    const post_status = form.value.post_status;
    const post_content = form.value.post_content;
    const post_image = form.value.post_image;
    
    this.post.addPost( post_title,  post_image,post_author, post_status, post_content).subscribe(
      (resp) => {
        this.data = resp;
        if (this.data.status == 200) {
          this.toastr.success(this.data.message);
        }
        this.onNoClick();
      },
      (err) => {
        console.log(err);
        if (this.data.status == 402) {
          this.toastr.error(this.data.message);
        }
      }
    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
