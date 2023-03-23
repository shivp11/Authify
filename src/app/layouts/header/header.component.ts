import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  loggedIn:boolean = false;

  constructor ( private auth:AuthenticationService ){}
  user:any;
  ngOnInit(): void {
    this.auth.status().subscribe((res) => {
      this.loggedIn = res;
      this.auth.user().subscribe((res:any)=>{
        this.user = res;  
        // console.log(this.user);
        },
        err=>{
          console.log(err);
        })
    }, (err) => {
      console.log(err);
    })
  }
}
