import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  checkbox:boolean = false;
  constructor(private auth:AuthenticationService, private router:Router, 
    private spinner: NgxSpinnerService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  userRole:any;
  private isAuthenticated: boolean = false;
  logout(){
    this.spinner.show();
    // console.log(this.checkbox);
    this.auth.logout(this.checkbox).pipe( finalize(() => { 
      this.spinner.hide();
     })).subscribe((res:any)=>{
      console.log(res.message);
      // Redirect
      this.toastr.success(res.message);
      localStorage.removeItem('user');  
      this.auth.toggleLogin(false);
      this.router.navigate(['/login']);
    }, (err) =>{
      console.log(err)
    })
  }

}
