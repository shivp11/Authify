import { Component, Inject} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PostService } from 'src/app/services/Post/post.service';
import { ManagePostComponent } from '../../manage-post/manage-post.component';
import { Post } from '../../manage-post/post.model';

@Component({
  selector: 'app-addpostsub',
  templateUrl: './addpostsub.component.html',
  styleUrls: ['./addpostsub.component.css']
})
export class AddpostsubComponent {

  constructor(private post: PostService, private auth: AuthenticationService,
    private spinner: NgxSpinnerService, private router: Router,
    private toastr: ToastrService, public dialogRef: MatDialogRef<ManagePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { this.getUser(); }

  ngOnInit(): void {
  }

  posts = new Post();

  postToUpdate = {
    id: "",
    name: "",
    email: "",
  }

  userIn: any
  getUser() {
    this.spinner.show();
    this.auth.user().pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe((res: any) => {
      // console.log(res);
      this.userIn = res.data;
    },
      err => {
        console.log(err);
      })
  }

  file: any
  ImageUpload(event: any) {
    this.file = event.target.files[0];
    // console.log(this.file);
  }

  addPost(form: NgForm) {
    this.spinner.show();
    const formData = new FormData();
    formData.append("post_image", this.file, this.file.name);
    formData.append("post_title", this.posts.post_title);
    formData.append("post_author", form.value.post_author);
    formData.append("post_status", 'Pending');
    formData.append("post_content", this.posts.post_content);

    this.post.addPostSubscriber(formData).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe(
      (resp) => {

        this.posts.post_title = '';
        this.posts.post_author = '';
        this.posts.post_status = '';
        this.posts.post_content = '';
        this.data = resp;

        if (this.data.code == 200) {
          this.toastr.success(this.data.message);
        }

        this.onNoClick();
      },
      (err) => {
        console.log(err);
        if (this.data.code == 402) {
          this.toastr.error(this.data.message);
        }
        this.onNoClick();
      }
    );
  }

  onNoClick(): void {
    this.post.filter('Add New Post..!!');
    this.dialogRef.close();
  }
}
