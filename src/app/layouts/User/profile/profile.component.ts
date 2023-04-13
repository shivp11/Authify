import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private auth: AuthenticationService, private router: Router,
    private spinner: NgxSpinnerService, private toastr: ToastrService) {
    this.spinner.show();
    this.auth.listen().pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe((res) => {
      this.getUser();
    })
  }
  // imagePath:any = "http://172.16.4.225:8080/angular/images/"
  imagePath: any = "http://127.0.0.1:8000/angular/images/"

  user: any;
  userProfile: any;
  ngOnInit(): void {
    this.spinner.show();
    this.auth.user().pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe((res: any) => {
      this.user = res.data;
      // this.userProfile = res;  
    },
      err => {
        console.log(err);
      });
    this.getUser();
  }

  getUser() {
    this.spinner.show();
    this.auth.user().pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe((res: any) => {
      // this.user = res.data;  
      this.userProfile = res.data;
    },
      err => {
        console.log(err);
      });
  }
  updateProfile(form: NgForm) {
    const name = form.value.name;
    this.spinner.show();
    this.auth.updateProfile(this.user.id, name).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe((res: any) => {
      this.message = res;
      // console.log(res);
      this.auth.toggleLogin(true);
      if (this.message.code == 200) {
        this.toastr.success(this.message.message);
      }
      this.auth.filter('Updated Profile..!!');
    },
      (err) => {
        if (err) {
          this.toastr.error('Something Went worng please try again!!!');
        }
      })
  }
  message: any;
  ImageUpload(event: any) {
    this.spinner.show();
    const file: File = event.target.files[0];
    this.auth.ImageUpload(this.user.id, file).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe((res) => {
      this.message = res;
      // console.log(this.message.status);
      if (this.message.code == 200) {
        this.toastr.success(this.message.message);
      }
      this.auth.toggleLogin(true);
      this.auth.filter('Profile Picture Updated..!!');
      // redirect to dashboard
      this.router.navigate(['/profile']);
    },
      (err) => {
        if (this.message.code == 402) {
          this.toastr.error(this.message.message);
        }
        if (err) {
          this.toastr.error('Something Went worng please try again!!!');
        }
      })
  }
}
