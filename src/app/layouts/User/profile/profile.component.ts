import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  constructor (private auth:AuthenticationService, private router:Router, private spinner: NgxSpinnerService){}

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
    this.spinner.show();
    this.auth.updateProfile(this.user.id, name).subscribe((res)=>{
      // console.log(res);
      this.auth.toggleLogin(true);
      // redirect to dashboard
      setTimeout(()=>{
        this.spinner.hide();
      }, 1000)
      this.router.navigate(['/profile']);
    },
    (err)=>{
      // this.errors = err.error.errors;
      console.log(err);
      setTimeout(()=>{
        this.spinner.hide();
      }, 1000)
      
      // console.log(err.error.errors);
    })
  }
}
