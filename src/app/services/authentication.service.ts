import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiUrl = 'http://127.0.0.1:8000/api/';
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient,) { }

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
      const token_expires_at = new Date(userObj.token_expires_at);
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

  // Login User
  login(email:string, password:string){
    return this.http.post(this.apiUrl+'login',{
      'email':email,
      'password':password,
    });
  }


  // User Info
  user(){
    const user:any = localStorage.getItem('user');
    const userObj:any = JSON.parse(user);
    // console.log(userObj);
    const token =userObj?.token;
    const headers = new HttpHeaders({
      Authorization: 'Bearer '+ token, 
    });
    
    return this.http.get(this.apiUrl+'user', {headers: headers})
  }

  // Logout
  logout(allDevice: boolean){
    const user: any = localStorage.getItem('user');
    const userObj = JSON?.parse(user);

    const token = userObj?.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.apiUrl+'logout', {allDevice:allDevice}, {headers:headers});
  }
  
  // Register
  register(name:string, email:string, password:string, password_confirmation:string){
    const data={
      name:name,
      email:email,
      password:password,
      password_confirmation:password_confirmation,
    }
    return this.http.post(this.apiUrl+'register', data);
  }

  // Forgot Pass
  forgot(email:string){
    return this.http.post(this.apiUrl+'forgot', {email:email});
  }

  // Reset Pass
  reset(token:string, password:string,password_confirmation:string){

    const data={
      token:token,
      password:password,
      password_confirmation:password_confirmation
    }
    return this.http.post(this.apiUrl+'reset', data);
  }

    // Update Profile
    updateProfile(id:any, name:string){
      const data={
        name:name,
      }
      return this.http.post(this.apiUrl+'updateProfile/'+id, data);
    }

    getUsers(){
      return this.http.get(this.apiUrl+'users/')
    }
    
    updateUsers(id: any, name:string, email:string, role:string){
      const data={
        id:id,
        name:name,
        email:email,
        role:role,
      }
      return this.http.post(this.apiUrl+'updateUsers/'+id, data)
    }

    ImageUpload(id: any, image:File){
      const formData = new FormData();
      formData.append("file", image)
      return this.http.post(this.apiUrl+'image/'+id, formData)
    }

    addUser(id: any, name:string, email:string, role:string){
      const data={
        id:id,
        name:name,
        email:email,
        role:role,
      }
      return this.http.post(this.apiUrl+'addUser', data)
    }

    deleteUser(id: any){
      const data={
        id:id,
      }
      return this.http.post(this.apiUrl+'deleteUser/'+id, data)
    }

}
