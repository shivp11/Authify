import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
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
export class ManagePostComponent implements OnInit{
  
  constructor(private post: PostService, private auth:AuthenticationService,
    private spinner: NgxSpinnerService, private router: Router,
    private toastr: ToastrService, private dialogRef: MatDialog) { }

    displayedColumns: string[] = ['post_author', 'post_title','post_status','post_content','post_image', 'action'];
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  
    @ViewChild(MatPaginator) matPaginator!: MatPaginator;
    @ViewChild(MatSort) matSort!: MatSort;
  
    imagePath:any = "http://127.0.0.1:8000/images/post/"


  ngOnInit(): void {
    this.getPostsDetails();
  }

  data: any;
  wait: boolean = false;
  PostDetails = null as any;
  FilterText = '';


  addPost() {
    this.dialogRef.open(AddPostComponent, {
      data: {
        author: 'Shiv Patel'
      },
      height: '82%',
      width: '600px',
    });
  }

  getPostsDetails() {
    this.post.getPosts().subscribe(
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

  filterData() {
    this.dataSource.filter = this.FilterText.trim().toLowerCase();
  }

  onEdit(row:any){
    this.dialogRef.open(UpdatePostComponent, {
      data: {
        id: row.id,
        post_title: row.post_title,
        post_author: row.post_author,
        post_status: row.post_status,
        post_content: row.post_content,
      },
      height: '72%',
      width: '600px',
    });
  }

  onDelete(row:any){
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
