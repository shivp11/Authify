import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PostService } from 'src/app/services/Post/post.service';
import { AddPostComponent } from '../Post/Modal/add-post/add-post.component';
import { AddpostsubComponent } from '../Post/Modal/addpostsub/addpostsub.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private post: PostService, private auth: AuthenticationService,
    private spinner: NgxSpinnerService, private router: Router,
    private toastr: ToastrService, private dialogRef: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef) { this.getLoggedInUser(); this.getUser() }

  ngOnInit(): void {
  }

  LoggedInUserRole: any;
  getLoggedInUser() {
    const user: any = localStorage?.getItem('user');
    const userObj: any = JSON?.parse(user);
    this.LoggedInUserRole = userObj.data.role;
  }

  user:any;
  getUser() {
    this.spinner.show();
    this.auth.user().pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe((res: any) => {
      // this.user = res.data;  
      this.user = res.data;
    },
      err => {
        console.log(err);
      });
  }
  // ADD POST MODAL 

  addPost() {
    this.dialogRef.open(AddpostsubComponent, {
      height: '74%',
      width: '700px',
    });
  }
}
