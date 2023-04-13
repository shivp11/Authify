import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { PostService } from 'src/app/services/Post/post.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reply-comment',
  templateUrl: './reply-comment.component.html',
  styleUrls: ['./reply-comment.component.css']
})
export class ReplyCommentComponent implements OnInit {

  constructor(private postAuth: PostService, private auth: AuthenticationService,
    private spinner: NgxSpinnerService, private router: Router,
    private toastr: ToastrService, public dialogRef: MatDialogRef<ReplyCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {  }

  ngOnInit(): void {
    this.getLoggedInUser();
  }

  imagePathUser: any = "http://127.0.0.1:8000/angular/images/";

  LoggedInUserId: any;
  getLoggedInUser() {
    const user: any = localStorage?.getItem('user');
    const userObj: any = JSON?.parse(user);
    this.LoggedInUserId = userObj.data;
  }


  wait:boolean = false;
  onSubmit(form: NgForm){
    const user_id = this.data.user_id;
    const post_id = this.data.post_id;
    const comment_id = this.data.comment_id;
    const comment_content = form.value.comment_content;
    this.postAuth.replycomment(user_id, post_id, comment_id, comment_content).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe(
      (res: any) => {
        // console.log(res.data);
        this.toastr.success(res.message);
        this.onNoClick();
        // console.log(this.PostDetails);
      },
      (err: any) => {
        console.log(err);
        this.toastr.error("Something Went worng please try again!!! ");
      }
    );
    form.reset();
  }

  onNoClick(): void {
    this.postAuth.filter('Add Comment..!!');
    this.dialogRef.close();
  }
}
