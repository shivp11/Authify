import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PostService } from 'src/app/services/Post/post.service';
import { AddPostComponent } from '../Modal/add-post/add-post.component';
import { DeletePostComponent } from '../Modal/delete-post/delete-post.component';
import { UpdatePostComponent } from '../Modal/update-post/update-post.component';

@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.component.html',
  styleUrls: ['./manage-post.component.css']
})
export class ManagePostComponent implements OnInit {

  constructor(private post: PostService, private auth: AuthenticationService,
    private spinner: NgxSpinnerService, private router: Router,
    private toastr: ToastrService, private dialogRef: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef) {
    this.spinner.show();
    this.post.listen().pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe((res: any) => {
      this.getPostsDetails();
      this.getLoggedInUser();
    });
  }

  displayedColumns: string[] = ['checkbox', 'post_author', 'post_title', 'post_status', 'post_content', 'post_image', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  wait: boolean = true;

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  imagePath?: any = "http://127.0.0.1:8000/images/post/";

  ngOnInit(): void {
    this.getPostsDetails();
  }



  // GET ALL POSTS OF SHOW IN TABLE

  PostDetails = null as any;
  getPostsDetails() {
    this.spinner.show();
    this.post.getPosts().pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe(
      (resp) => {
        // console.log(resp);
        this.PostDetails = resp;
        this.dataSource = new MatTableDataSource<any>(this.PostDetails);
        if (this.matPaginator) {
          this.dataSource.paginator = this.matPaginator;
        }
        if (this.matSort) {
          this.dataSource.sort = this.matSort;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // CHECK-BOX 
  isDisabled: boolean = true;
  LoggedInUserID: any;
  getLoggedInUser() {
    const user: any = localStorage?.getItem('user');
    const userObj: any = JSON?.parse(user);
    this.LoggedInUserID = userObj.data.id;
  }


  lessons: any[] = [];
  selection = new SelectionModel<any>(true, [])
  onSelect(element: any) {
    this.lessons = element;
    this.selection.toggle(this.lessons);
    this.selection.selected;
  }

  // MAKE ARRAY OF SELECTED CHECK-BOX ROW AND STORE ID

  SelectedIDs: any[] = [];
  selectID(id: any) {
    this.wait = false;
    if (this.SelectedIDs.includes(id)) {
      // console.log(this.SelectedIDs);
      const indexNo = this.SelectedIDs.lastIndexOf(id);
      // console.log('indexNo ',indexNo);
      // console.log(this.SelectedIDs);
      this.SelectedIDs.splice(indexNo, 1);
      if (this.SelectedIDs.length == 0) {
        this.wait = true;
      }
      // console.log('id: ', id);
    } else {
      this.SelectedIDs.push(id);
      // console.log(this.SelectedIDs);
    }
    // console.log('abc ', this.SelectedIDs);
  }


  // CHECK-BOX 

  isAllSelected() {
    return this.selection.selected.length == this.SelectedIDs.length;
  }


  // SELECT_ALL_CHECK_BOX IN TABLE

  toggleAll() {
    // console.log('Initial Selection.selected.length', this.selection.selected.length);
    // console.log('Initial SelectedIDs.length', this.SelectedIDs.length);
    if (this.selection.selected.length == 0) {
      this.selection.select(...this.dataSource.data);
      this.wait = false;
      this.selection.selected.forEach(id => {
        this.SelectedIDs.push(id.id);
      });
      // console.log('selection.selected.length', this.selection.selected.length);
      // console.log('SelectedIDs.length', this.SelectedIDs.length);
    } else {
      if (this.isAllSelected()) {
        this.selection.clear();
        this.SelectedIDs = [];
        this.wait = true;
        // console.log('selection.selected.length', this.selection.selected.length);
        // console.log('SelectedIDs.length', this.SelectedIDs.length);
      }
    }
    // console.log('END SelectedIDs ', this.SelectedIDs);
    // console.log('END Selection.selected ', this.selection.selected);
  }


  // Selected ID Delete

  data: any;
  deleteSelected() {
    if (this.SelectedIDs.length == 0) {
      this.toastr.error('Something Went worng please try again!!!');
      return;
    } else {
      // console.log(this.SelectedIDs);
      this.spinner.show();
      this.post.deleteSelectedPosts(this.SelectedIDs).pipe(finalize(() => {
        this.spinner.hide();
      })).subscribe(
        (resp) => {
          this.data = resp;
          if (this.data.code == 200) {
            this.toastr.success(this.data.message);
          }
          this.wait = true;
          this.post.filter('Post Deleted..!!');
          this.selection.clear();
          this.SelectedIDs = [];
          // console.log('Delete After SelectedIDs',this.SelectedIDs);
          // console.log('Delete After Selection.selected',this.selection.selected);
        },
        (err) => {
          console.log(err);
          if (err) {
            this.toastr.error('Something Went worng please try again!!!');
          }
          this.wait = false;
        }
      );
    }
    // this.toastr.success('Selected Post Deleted..');
    // console.log(this.SelectedIDs);
  }


  // Selected ID Post_status Change..

  Pending: string = 'Pending';
  Approved: string = 'Approved';
  StatusSelected(data: any) {
    this.spinner.show();
    this.post.StatusSelectedPosts(this.SelectedIDs, data).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe(
      (resp) => {
        this.data = resp;
        if (this.data.code == 200) {
          this.toastr.success(this.data.message);
        }
        this.post.filter('Post Status Changed..!!');
        this.wait = true;
        this.selection.clear();
        this.SelectedIDs = [];
      },
      (err) => {
        console.log(err);
        if (err) {
          this.toastr.error('Something Went worng please try again!!!');
        }
        this.wait = true;
      }
    );
  }

  // ADD POST MODAL 

  addPost() {
    this.dialogRef.open(AddPostComponent, {
      height: '85%',
      width: '700px',
    });
  }


  // SEARCH TEXT TRIM (removes whitespace from both ends of a string and returns a new string)

  FilterText = '';
  filterData() {
    this.dataSource.filter = this.FilterText.trim().toLowerCase();
  }


  // EDIT POST MODAL 
  onEdit(row: any) {
    this.dialogRef.open(UpdatePostComponent, {
      data: {
        id: row.id,
        post_title: row.post_title,
        post_author: row.post_author,
        post_status: row.post_status,
        post_content: row.post_content,
        post_image: row.post_image,
      },
      height: '93%',
      width: '700px',
    });
  }


  // DELETE POST MODAL 

  onDelete(row: any) {
    this.dialogRef.open(DeletePostComponent, {
      data: {
        id: row.id,
        post_title: row.post_title,
        post_author: row.post_author,
        post_status: row.post_status,
        post_content: row.post_content,
      },
      height: 'auto',
      width: '400px',
    });
  }

}
