import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
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
    this.spinner.show();
    this.auth.login(email, password).pipe( finalize(() => { 
      this.spinner.hide();
     })).subscribe((res:any)=>{
      localStorage.setItem('user', JSON.stringify(res));
      
      this.auth.toggleLogin(true);

      if (res.code == 200) {
        this.toastr.success( res.message + ' ' + res.data.name);
      }
      if(res.data.role === 'Admin'){
        this.router.navigate(['/dashboard']);
      }else{
        this.router.navigate(['/profile']);
      }
    },
    (err:any)=>{
      console.log(err);
      this.message = err;
      if (this.message.error.code == 401) {
        this.toastr.error(this.message.error.message);
      }
    })
  }
}
