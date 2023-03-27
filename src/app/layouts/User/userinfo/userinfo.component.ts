import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';


@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  redirectUrl = '/userinfo';

  constructor(private auth: AuthenticationService,
    private spinner: NgxSpinnerService, private router: Router,
    private toastr: ToastrService, private dialogRef: MatDialog) { }
    
  imagePath:any = "http://127.0.0.1:8000/angular/images/"
  displayedColumns: string[] = ['name', 'email','role' , 'image', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  
  ngOnInit(): void {
    this.getUsersDetails();
  }
  
  data: any;
  wait: boolean = false;
  userDetails = null as any;
  FilterText = '';
  

  openDialog() {
    this.dialogRef.open(AddUserComponent, {
      data: {
        name: 'Shiv Patel'
      },
      height: 'auto',
      width: '400px',
    });
  }

  onEdit(row:any){
    this.dialogRef.open(UpdateUserComponent, {
      data: {
        id: row.id,
        name: row.name,
        email: row.email,
        role: row.role,
      },
      height: 'auto',
      width: '400px',
    });
  }

  onDelete(row:any){
    this.dialogRef.open(DeleteUserComponent, {
      data: {
        id: row.id,
      },
      height: 'auto',
      width: '400px',
    });
  }

  getUsersDetails() {
    this.auth.getUsers().subscribe(
      (resp) => {
        // console.log(resp);
        this.userDetails = resp;
        this.dataSource = new MatTableDataSource<any>(this.userDetails);
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

  // handleRedirectAfterSubmit() {
  //   window.location.href = this.redirectUrl
  // }

}
