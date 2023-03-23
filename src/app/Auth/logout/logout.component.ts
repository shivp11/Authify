import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  checkbox:boolean = false;
  constructor(private auth:AuthenticationService, private router:Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }
  
  logout(){
    // console.log(this.checkbox);
    this.spinner.show();
    this.auth.logout(this.checkbox).subscribe((res)=>{
      console.log(res);
      setTimeout(()=>{
        this.spinner.hide();
      }, 500)
      // Redirect
      localStorage.removeItem('user');
      this.auth.toggleLogin(false);
      this.router.navigate(['/login']);
    }, (err) =>{
      setTimeout(()=>{
        this.spinner.hide();
      }, 500)
      console.log(err)
    })
  }

}
