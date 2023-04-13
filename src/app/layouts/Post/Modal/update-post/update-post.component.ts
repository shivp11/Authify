import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PostService } from 'src/app/services/Post/post.service';
import { ManagePostComponent } from '../../manage-post/manage-post.component';
import { Post } from '../../manage-post/post.model';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  constructor(private auth: AuthenticationService,
    private post: PostService, private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<ManagePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {

  }

  // imagePath:any = "http://172.16.4.225:8080/images/post/"
  imagePath: any = "http://127.0.0.1:8000/images/post/"

  posts = new Post();

  file: any
  ImageUpload(event: any) {
    this.file = event.target.files[0];
    // console.log(this.file);
  }
  updatePost(form: NgForm) {
    const formData = new FormData();
    
    if(this.file){
      formData.append("post_image", this?.file, this.file.name);
    }
    formData.append("post_title", form.value.post_title);
    formData.append("post_author", form.value.post_author);
    formData.append("post_status", form.value.post_status);
    formData.append("post_content", form.value.post_content);
    this.spinner.show();
    this.post.updatePosts(this.data.id, formData).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe(
      (resp) => {

        // console.log(resp);

        this.posts.post_title = '';
        this.posts.post_author = '';
        this.posts.post_status = '';
        this.posts.post_content = '';

        this.data = resp;
        if (this.data.code == 200) {
          this.toastr.success(this.data.message);
        }
        this.onNoClick(this.data);
        this.getPostsDetails();
      },
      (err) => {
        this.toastr.success(this.data.message);
        console.log(err);
        if (this.data.code == 402) {
          this.toastr.error(this.data.message);
        }
        if (err) {
          this.toastr.error('Something Went worng please try again!!!');
        }
      }
    );
  }

  onNoClick(data:any): void {
    this.dialogRef.close(data);
    this.post.filter('Updated Post..!!');
  }

  PostDetails = null as any;
  getPostsDetails() {
    this.spinner.show();
    this.post.getPosts().pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe(
      (resp) => {
        // console.log(resp);
        this.PostDetails = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
