import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { PostService } from 'src/app/services/Post/post.service';
import { ReplyCommentComponent } from '../../Modal/reply-comment/reply-comment.component';

@Component({
  selector: 'app-commentpage',
  templateUrl: './commentpage.component.html',
  styleUrls: ['./commentpage.component.css']
})
export class CommentpageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private postAuth: PostService,
    private spinner: NgxSpinnerService, private toastr: ToastrService,
    private dialogRef: MatDialog) {
    this.spinner.show();
    this.postAuth.listen().pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe((res: any) => {
      this.getLoggedInUser();
      this.getPostById();
      this.getComment();
      this.getCount();
    });
    this.getCount();
  }

  imagePath: any = "http://127.0.0.1:8000/images/post/";
  imagePathUser: any = "http://127.0.0.1:8000/angular/images/";

  postByid: any;
  ngOnInit(): void {
    this.getLoggedInUser();
    this.getPostById();
    this.getComment();
    this.getReplyComment();
  
  }


  id: any;
  getPostById() {
    this.spinner.show();
    this.id = this.route.snapshot.paramMap.get('id');
    this.postAuth.getPostbyId(this.id).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe(
      (res: any) => {
        // console.log(res.data);
        this.postByid = res.data;
        this.getCount();
        // console.log(this.PostDetails);
      },
      (err: any) => {
        console.log(err);
        this.toastr.error("Something Went worng please try again!!! ");
      }
    );
  }


  LoggedInUserId: any;
  getLoggedInUser() {
    const user: any = localStorage?.getItem('user');
    const userObj: any = JSON?.parse(user);
    this.LoggedInUserId = userObj.data;
  }

  onSubmit(form: NgForm) {
    this.spinner.show();
    const user_id = this.LoggedInUserId.id;
    const post_id = this.id;
    const comment_content = form.value.comment_content;
    this.postAuth.comment(user_id, post_id, comment_content).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe(
      (res: any) => {
        // console.log(res.data);
        this.toastr.success(res.message);
        this.postAuth.filter('Commented..!!');
        // console.log(this.PostDetails);
      },
      (err: any) => {
        console.log(err);
        this.toastr.error("Something Went worng please try again!!! ");
      }
    );
    form.reset();
  }

  comments: any
  getComment() {
    this.postAuth.getcomment(this.id).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe(
      (res: any) => {
        this.comments = res.data;
        // console.log(res);
      },
      (err: any) => {
        console.log(err);
        // this.toastr.error("Something Went worng please try again!!! ");
      }
    );
  }

  replycomments: any
  getReplyComment() {
    this.postAuth.getreplycomment(this.id).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe(
      (res: any) => {
        this.replycomments = res.data;
        // console.log(res);
      },
      (err: any) => {
        console.log(err);
        // this.toastr.error("Something Went worng please try again!!! ");
      }
    );
  }
  // ReplyComment
  comment_id: any;
  wait2: boolean = true;
  replyComment(commentId: any) {
    this.wait2 = false;
    this.comment_id = commentId;
    // alert(comment_id);
  }
  onReplySubmit(form: NgForm) {
    this.spinner.show();
    const user_id = this.LoggedInUserId.id;
    const post_id = this.id;
    const comment_id = this.comment_id;
    const comment_content = form.value.comment_content;
    this.postAuth.replycomment(user_id, post_id, comment_id, comment_content).pipe(finalize(() => {
      this.spinner.hide();
      this.wait2 = true;
    })).subscribe(
      (res: any) => {
        // console.log(res.data);
        this.toastr.success(res.message);
        this.postAuth.filter('ReplyCommented..!!');

        // console.log(this.PostDetails);
      },
      (err: any) => {
        console.log(err);
        this.toastr.error("Something Went worng please try again!!! ");
      }
    );
    form.reset();
  }


  wait: boolean = true;
  showinput() {
    if (this.wait === true) {
      this.wait = false;
    } else {
      this.wait = true;
    }
  }

  likecount:any
  like(post_id:any){
    // alert(post_id);
    this.spinner.show();
    const user_id = this.LoggedInUserId.id;
    this.postAuth.like(user_id, post_id).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe(
      (res: any) => {
        // console.log(res);
        this.toastr.success(res.message);
        this.getCount();
        // this.postAuth.filter('Liked..!!');
      },
      (err: any) => {
        console.log(err);
        this.toastr.error("Something Went worng please try again!!! ");
      }
    );
  }

  dislikecount:any;
  dislike(post_id:any){
    // alert(post_id);
    this.spinner.show();
    const user_id = this.LoggedInUserId.id;
    this.postAuth.dislike(user_id, post_id).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe(
      (res: any) => {
        // console.log(res.message);
        this.toastr.success(res.message);
        this.getCount();
        // this.postAuth.filter('Disliked..!!');
      },
      (err: any) => {
        console.log(err);
        this.toastr.error("Something Went worng please try again!!! ");
      }
    );
  }

  count:any
  getCount(){
    this.postAuth.getCount(this.id).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe(
      (res: any) => {
        // console.log(res.message);
        this.count = res;
      },
      (err: any) => {
        console.log(err);
        this.toastr.error("Something Went worng please try again!!! ");
      }
    );
  }
}
