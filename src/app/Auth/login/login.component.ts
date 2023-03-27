import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errors = {
    email:null,
    password:null,
  }

  error:any;

  constructor( private router: Router, private auth:AuthenticationService, 
    private spinner: NgxSpinnerService , private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  message:any;
  onSubmit(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.auth.login(email, password).subscribe((res:any)=>{
      localStorage.setItem('user', JSON.stringify(res));
      
      this.auth.toggleLogin(true);
      // redirect to dashboard
      this.message = res.message + ' ' + res.name;
      // console.log(this.message);
      this.toastr.success(this.message);
      this.router.navigate(['/dashboard']);
    },
    err=>{
      this.errors = err.error.errors;
      this.error = err.error.message;
      console.log(this.error);
    })
  }
}
