import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent {

  userDetails = null as any;
  userToUpdate = {
    id:"",
    name:"",
    email:"",
  }

  constructor(private auth:AuthenticationService, private spinner: NgxSpinnerService, private router: Router) {
    this.getUsersDetails();
  }

  wait:boolean = false;
  getUsersDetails() {
    this.auth.getUsers().subscribe(
      (resp) => {
        console.log(resp);
        this.userDetails = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  edit(user1 :any){
    this.userToUpdate=user1;
  }

  updateUser(form:NgForm){
    this.spinner.show();
    console.log(form);
    
    const name = form.value.name;
    const email = form.value.email;
    this.auth.updateUsers(this.userToUpdate.id, name, email).subscribe(
      (resp) => {      
        setTimeout(()=>{
          this.spinner.hide();
        }, 1000)
       this.router.navigate(['/userinfo']);
      },
      (err) => {
        console.log(err);
        setTimeout(()=>{
          this.spinner.hide();
        }, 1000)
      }
    );
  }
}
