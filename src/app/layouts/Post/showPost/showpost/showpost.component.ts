import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PostService } from 'src/app/services/Post/post.service';

@Component({
  selector: 'app-showpost',
  templateUrl: './showpost.component.html',
  styleUrls: ['./showpost.component.css']
})
export class ShowpostComponent implements OnInit {

  constructor(private postAuth: PostService, private auth: AuthenticationService,
    private spinner: NgxSpinnerService, private router: Router,
    private toastr: ToastrService, private dialogRef: MatDialog) { 
      this.getPostsDetails();
    }

    FilterText='';
  ngOnInit(): void {
    this.getPostsDetails();
  }

  imagePath: any = "http://127.0.0.1:8000/images/post/";

  p:any;
  PostDetails = null as any;
  getPostsDetails() {
    this.spinner.show();
    this.postAuth.getSubscriberPosts().pipe(finalize(() => {
      this.spinner.hide();
      })).subscribe(
      (res:any) => {
        this.PostDetails = res;
        // console.log(this.PostDetails);
      },
      (err:any) => {
        console.log(err);
        this.toastr.error("Something Went worng please try again!!! ");
      }
    );
  }

  postByid:any;
  commentpage(id:any){
    // alert(id);
    this.postAuth.getPostbyId(id).pipe(finalize(() => {
      this.spinner.hide();
      })).subscribe(
      (res:any) => {
        this.postByid = res.data;
        // console.log(this.PostDetails);
      },
      (err:any) => {
        console.log(err);
        this.toastr.error("Something Went worng please try again!!! ");
      }
    );
  }
}
