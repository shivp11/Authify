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
import { SelectionModel } from '@angular/cdk/collections';
import { finalize, skip } from 'rxjs';
import { SelecteduserComponent } from '../SelectedUserModal/selecteduser/selecteduser.component';


@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  redirectUrl = '/userinfo';

  constructor(private auth: AuthenticationService,
    private spinner: NgxSpinnerService, private router: Router,
    private toastr: ToastrService, private dialogRef: MatDialog) {
    this.spinner.show();
    this.auth.listen().pipe(finalize(() => {
      this.spinner.hide();
      
    })).subscribe((res) => {
      this.getUsersDetails();
      this.getLoggedInUser();
    })
  }

  // imagePath:any = "http://172.16.4.225:8080/angular/images/"
  imagePath?: any = "http://127.0.0.1:8000/angular/images/"

  displayedColumns: string[] = ['checkbox', 'name', 'email', 'role', 'image', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  LoggedIn: boolean = false;
  LoggedInUserID: any;
  getLoggedInUser() {
    const user: any = localStorage?.getItem('user');
    const userObj: any = JSON?.parse(user);
    this.LoggedInUserID = userObj.data.id;
    // console.log(this.LoggedInUserID);
    // console.log(userObj);
  }


  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  ngOnInit(): void {
    this.getUsersDetails();
    this.getLoggedInUser();
  }

  data: any;
  wait: boolean = true;
  userDetails = null as any;
  FilterText = '';


  openDialog() {
    this.dialogRef.open(AddUserComponent, {
      height: 'auto',
      width: '400px',
    });
  }

  SelectedUserModal() {
    this.dialogRef.open(SelecteduserComponent, {
      data: {
        id:this.SelectedIDs,
      },
      height: '200px',
      width: '300px',
    });
  }

  onEdit(row: any) {
    this.dialogRef.open(UpdateUserComponent, {
      data: {
        id: row.id,
        name: row.name,
        email: row.email,
        role: row.role,
        profile: row?.profile,
      },
      height: 'auto',
      width: '400px',
    });
  }

  onDelete(row: any) {
    this.dialogRef.open(DeleteUserComponent, {
      data: {
        id: row.id,
      },
      height: 'auto',
      width: '400px',
    });
  }

  getUsersDetails() {
    this.spinner.show();
    this.auth.getUsers().pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe(
      (resp:any) => {
        // console.log(resp);
        this.userDetails = resp.data;
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


  // CHECK-BOX 

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
    console.log('Initial SelectedIDs.length', this.SelectedIDs.length);
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
    console.log('END SelectedIDs S ', this.SelectedIDs);
  }


  // CHECK-BOX 

  isAllSelected() {
    return this.selection.selected.length == this.SelectedIDs.length;
  }


  // SELECT_ALL_CHECK_BOX IN TABLE

  toggleAll() {
    // console.log('Initial Selection.selected.length', this.selection.selected.length);
    console.log('Initial SelectedIDs.length', this.SelectedIDs.length);
    if (this.selection.selected.length == 0) {
      this.selection.select(...this.dataSource.data);
      this.wait = false;
      this.selection.selected.forEach(id => {
        if (id.id === this.LoggedInUserID) {
          false
        } else {
          this.SelectedIDs.push(id.id);
        }

      });
      // console.log('selection.selected.length', this.selection.selected.length);
      // console.log('SelectedIDs.length', this.SelectedIDs.length);
    } else {
      if (this.isAllSelected() == false) {
        this.selection.clear();
        this.SelectedIDs = [];
        this.wait = true;
        // console.log('selection.selected.length', this.selection.selected.length);
        // console.log('SelectedIDs.length', this.SelectedIDs.length);
      }
    }
    console.log('END SelectedIDs ', this.SelectedIDs);
    // console.log('END Selection.selected ', this.selection.selected);
  }


  // Selected ID Delete

  deleteSelected() {
    if (this.SelectedIDs.length == 0) {
      this.toastr.error('Something Went worng please try again!!!');
      return;
    } else {
      this.spinner.show();
      // console.log('delete ', this.SelectedIDs);
      this.auth.deleteSelectedUsers(this.SelectedIDs).pipe(finalize(() => {
        this.spinner.hide();
      })).subscribe(
        (resp) => {
          // console.log(resp);

          this.data = resp;
          if (this.data.code == 200) {
            this.toastr.success(this.data.message);
          }
          this.auth.filter('User Deleted..!!');
          this.wait = true;
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
          this.wait = true;
        }
      );
    }
    // this.toastr.success('Selected Post Deleted..');
    // console.log(this.SelectedIDs);
  }


  // Selected ID User_Role Change..

  Subscriber: string = 'Subscriber';
  Admin: string = 'Admin';
  RoleSelected(data: any) {
    this.spinner.show();
    this.auth.RoleSelectedUsers(this.SelectedIDs, data).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe(
      (resp) => {
        this.data = resp;
        // console.log(resp);

        if (this.data.code == 200) {
          this.toastr.success(this.data.message);
        }
        this.auth.filter('User Role Changed..!!');
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

}
