import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  constructor (private auth:AuthenticationService, private router:Router, 
    private spinner: NgxSpinnerService, private toastr:ToastrService){}
  imagePath:any = "http://127.0.0.1:8000/angular/images/"
  user:any;
  ngOnInit(): void {
    this.auth.user().subscribe((res:any)=>{
      this.user = res;  
      },
      err=>{
        console.log(err);
      })
  }
  updateProfile(form:NgForm){
    const name = form.value.name;
    // this.spinner.show();
    this.auth.updateProfile(this.user.id, name).subscribe((res)=>{
      this.message = res;
      this.auth.toggleLogin(true);
      if(this.message.status == 200){
        this.toastr.success(this.message.message);
      }
      // redirect to dashboard
      this.router.navigate(['/profile']);
    },
    (err)=>{
      // this.errors = err.error.errors;
      // console.log(err);
      // console.log(err.error.errors);
      if(err){
        this.toastr.error('Something Went worng please try again!!!');
      }
    })
  }
  message:any;
  ImageUpload(event:any){
    const file:File = event.target.files[0];
    this.auth.ImageUpload(this.user.id, file).subscribe((res)=>{
      this.message = res;
      // console.log(this.message.status);
      if(this.message.status == 200){
        this.toastr.success(this.message.message);
      }
      this.auth.toggleLogin(true);
      // redirect to dashboard
      this.router.navigate(['/profile']);
    },
    (err)=>{
      if(this.message.status == 402){
        this.toastr.error(this.message.message);
      }
      if(err){
        this.toastr.error('Something Went worng please try again!!!');
      }
    })
  }
}
