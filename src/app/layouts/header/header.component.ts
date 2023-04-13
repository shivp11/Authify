import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  loggedIn:boolean = false;

  imagePath:any = "http://127.0.0.1:8000/angular/images/";
  // imagePath:any = "http://172.16.4.225:8080/angular/images/";
  user:any;
  constructor ( private auth:AuthenticationService, private router: Router,
    private spinner: NgxSpinnerService){
    this.getuser();
  }
  ngOnInit(): void {}

  getuser() {
    this.auth.status().subscribe((res:any) => {
      this.loggedIn = res;
      // console.log(res);
      if(this.loggedIn){
        this.spinner.show();
        this.auth.user().pipe( finalize(() => { 
          this.spinner.hide();
         })).subscribe((res: any) => {
          this.user = res.data;
          if(res.code == 200){
            // console.log(res.data);
          }
        },
          (err:any) => {
            console.log(err);
          })
      }
    },(err:any) => {
      console.log(err);
    });
  }
}
