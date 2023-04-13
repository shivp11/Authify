import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiUrl = 'http://127.0.0.1:8000/api/';
  // apiUrl = 'http://172.16.4.225:8080/api/';
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,) {
    // this.getUserRole();
   }

  // Toogle Loggedin
  toggleLogin(state: boolean): void {
    this.isLoggedIn.next(state);
  }

  // Status
  status() {
    const localData: any = localStorage.getItem('user');
    if (!localData) {
      this.isLoggedIn.next(false);
      // console.log('User not lgged in !!');
    } else {
      const userObj = JSON.parse(localData);

      const token_expires_at = new Date(userObj.data.token_expires_at);
      this.userRole = userObj.data.role;
      const current_date = new Date();

      if (token_expires_at > current_date) {
        this.isLoggedIn.next(true);
      } else {
        this.isLoggedIn.next(false);
        console.log('Token Expires!!');
      }
    }
    return this.isLoggedIn.asObservable();
  }


  userRole:any;
  getUserRole(): string {
    this.user().subscribe((res: any) => {
    this.userRole=res.data.role;
    });
    console.log('Hie: ', this.userRole);
    
    return this.userRole;
  }

  // Login User
  login(email: string, password: string) {
    return this.http.post(this.apiUrl + 'login', {
      'email': email,
      'password': password,
    });
  }


  // isAuthenticate() {
  //   return this.isAuthenticated;
  // }


  // User Info
  user() {
    const user: any = localStorage?.getItem('user');
    const userObj: any = JSON?.parse(user);
    // console.log(userObj);
    const token = userObj?.data.token;
    // console.log(token);    
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http?.get(this.apiUrl + 'user', { headers: headers })
  }
  userdata: any;

  getDataFormApi() {
    const user: any = localStorage?.getItem('user');
    const userObj: any = JSON?.parse(user);
    const token = userObj?.data.token;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.post(this.apiUrl + 'users', { headers: headers });
  }

  // Logout
  logout(allDevice: boolean) {
    // this.userRole='';
    // this.isAuthenticated=false;
    const user: any = localStorage.getItem('user');
    const userObj = JSON?.parse(user);
    const token = userObj.data.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.apiUrl + 'logout', { allDevice: allDevice }, { headers: headers });
  }

  // Register
  register(name: string, email: string, password: string, password_confirmation: string) {
    const data = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    }
    return this.http.post(this.apiUrl + 'register', data);
  }

  // Forgot Pass
  forgot(email: string) {
    return this.http.post(this.apiUrl + 'forgot', { email: email });
  }

  // Reset Pass
  reset(token: string, password: string, password_confirmation: string) {

    const data = {
      token: token,
      password: password,
      password_confirmation: password_confirmation
    }
    return this.http.post(this.apiUrl + 'reset', data);
  }

  // Update Profile
  updateProfile(id: any, name: string) {
    const data = {
      name: name,
    }
    return this.http.post(this.apiUrl + 'updateProfile/' + id, data);
  }

  getUsers() {
    const user: any = localStorage?.getItem('user');
    const userObj: any = JSON?.parse(user);
    const token = userObj?.data.token;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.get(this.apiUrl + 'users/', { headers: headers })
  }

  updateUsers(id: any, data: any) {
    const user: any = localStorage?.getItem('user');
    const userObj: any = JSON?.parse(user);
    const token = userObj?.data.token;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.post(this.apiUrl + 'updateUsers/' + id, data, { headers: headers })
  }

  ImageUpload(id: any, image: File) {
    const formData = new FormData();
    formData.append("file", image)
    return this.http.post(this.apiUrl + 'image/' + id, formData)
  }

  addUser(id: any, name: string, email: string, role: string) {
    const user: any = localStorage?.getItem('user');
    const userObj: any = JSON?.parse(user);
    const token = userObj?.data.token;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    const data = {
      id: id,
      name: name,
      email: email,
      role: role,
    }
    return this.http.post(this.apiUrl + 'addUser', data, { headers: headers })
  }

  deleteUser(id: any) {
    const user: any = localStorage?.getItem('user');
    const userObj: any = JSON?.parse(user);
    const token = userObj?.data.token;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.post(this.apiUrl + 'deleteUser/'+id, id, { headers: headers })
  }

  deleteSelectedUsers(id: any) {
    const data = {
      id: id,
    }
    const user: any = localStorage?.getItem('user');
    const userObj: any = JSON?.parse(user);
    const token = userObj?.data.token;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    // console.log(data);
    return this.http.post(this.apiUrl + 'deleteSelectedUsers', data, { headers: headers })
  }

  RoleSelectedUsers(id: any, role:string){
    const data={
      id:id,
      role:role
    }
    const user: any = localStorage?.getItem('user');
    const userObj: any = JSON?.parse(user);
    const token = userObj?.data.token;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.post(this.apiUrl+'roleSelectedUsers', data, { headers: headers })
  }

  data: any
  loginUser() {
    this.user().subscribe((res: any) => {
      this.data = res;
    },
      err => {
        console.log(err);
      })
  }

  private  _listners = new Subject<any>();
  listen(): Observable<any>{
    return this._listners.asObservable();
  }

  filter(filterBy: String){
    this._listners.next(filterBy);
  }

}
