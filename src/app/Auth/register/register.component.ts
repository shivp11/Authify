import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errors = {
    name:null,
    email:null,
    password:null,
  }
  constructor(private auth:AuthenticationService, private router:Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    const password_confirmation = form.value.password_confirmation;

    this.auth.register(name,email,password,password_confirmation).subscribe((res)=>{
      // console.log(res);
      this.auth.toggleLogin(true);
      // redirect to dashboard
      this.router.navigate(['/login']);
    },
    (err)=>{
      this.errors = err.error.errors;
      console.log(err);
      
      // console.log(err.error.errors);
    })
  }
}