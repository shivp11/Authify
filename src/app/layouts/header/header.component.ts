import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  loggedIn:boolean = false;

  imagePath:any = "http://127.0.0.1:8000/angular/images/"
  constructor ( private auth:AuthenticationService ){
    this.auth.status().subscribe((res) => {
      this.loggedIn = res;
      this.auth.user().subscribe((res:any)=>{
        this.user = res;  
        },
        err=>{
          console.log(err);
        })
    }, (err) => {
      console.log(err);
    })
  }
  user:any;
  ngOnInit(): void {

  }
}
