import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize, Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router,
    private toastr: ToastrService, private spinner: NgxSpinnerService) {
  }

  userRole: any;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user: any = localStorage?.getItem('user');
    const userObj: any = JSON?.parse(user);
    this.userRole = userObj.data.role;

    // console.log('AdminGurad: ', this.userRole);

    if (this.userRole == 'Admin') {
      return true;
    } else {
      // this.toastr.error('Only Admin Can Access This Page..!!!');
      this.spinner.show();
      this.authService.logout(false).pipe(finalize(() => {
        this.spinner.hide();
      })).subscribe((res: any) => {
        // console.log(res.message);
        localStorage.removeItem('user');
        this.userRole = '';
        this.authService.toggleLogin(false);
        this.toastr.error('Only Admin Can Access This Page..!!!');
        this.router.navigate(['/login']);
      }, (err) => {
        console.log(err)
      });
      return false;
    }
  }
}


