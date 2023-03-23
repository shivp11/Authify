import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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

  constructor( private router: Router, private auth:AuthenticationService, private spinner: NgxSpinnerService ) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.spinner.show();
    this.auth.login(email, password).subscribe((res:any)=>{
      // console.log(res);
      localStorage.setItem('user', JSON.stringify(res));
      
      this.auth.toggleLogin(true);
      // redirect to dashboard
      setTimeout(()=>{
        this.spinner.hide();
      }, 1000)
      this.router.navigate(['/dashboard']);
    },
    err=>{
      setTimeout(()=>{
        this.spinner.hide();
      }, 1000)
      this.errors = err.error.errors;
      this.error = err.error.message;
      console.log(this.error);
    })
  }
}
