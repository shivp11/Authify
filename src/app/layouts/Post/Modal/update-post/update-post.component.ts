import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/Post/post.service';
import { ManagePostComponent } from '../../manage-post/manage-post.component';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  constructor(
    private post: PostService, private toastr: ToastrService,
    public dialogRef: MatDialogRef<ManagePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

  }

  updatePost(form: NgForm) {   
    console.log(form.value);
    
    const post_title = form.value.post_title;
    const post_author = form.value.post_author;
    const post_status = form.value.post_status;
    const post_content = form.value.post_content;
    console.log(this.data.id);

    this.post.updatePosts(this.data.id, post_title, post_author,post_status ,post_content).subscribe(
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
