import { Component  } from '@angular/core';
import {enableProdMode} from '@angular/core';
import { NgxUiLoaderService } from "ngx-ui-loader"; 
import { AuthenticationService } from './services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Authify-Angular';
  loggedIn:boolean = false;

  constructor ( private auth:AuthenticationService, private loader:NgxUiLoaderService){}


  ngOnInit(): void {
    this.loader.start();

    setTimeout(()=>{
      this.loader.stop();
    }, 1000);
    this.auth.status().subscribe((res) => {
      this.loggedIn = res;
      // console.log('navbar:' + this.loggedIn);
    }, (err) => {
      console.log(err);
    })
  }
}
