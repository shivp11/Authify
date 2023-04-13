import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  apiUrl = 'http://127.0.0.1:8000/api/';
  // apiUrl = 'http://172.16.4.225:8080/api/';

  constructor(private http:HttpClient) { }

  getPosts(){
    const user: any = localStorage?.getItem('user');
    const userObj: any = JSON?.parse(user);
    const token = userObj?.data.token;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.get(this.apiUrl+'posts/', { headers: headers })
  }

  getPostbyId(id:any){
    const user: any = localStorage?.getItem('user');
    const userObj: any = JSON?.parse(user);
    const token = userObj?.data.token;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.post(this.apiUrl+'postByid/'+id, { headers: headers })
  }

  getSubscriberPosts(){
    return this.http.get(this.apiUrl+'Subscriberposts/')
  }
  
  addPostSubscriber(data:any){
    return this.http.post(this.apiUrl+'addPostSubscriber', data)
  }

  addPost(data:any){
    const user: any = localStorage?.getItem('user');
    const userObj: any = JSON?.parse(user);
    const token = userObj?.data.token;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.post(this.apiUrl+'addPost', data, { headers: headers })
  }


  updatePosts(id: any, data:any){
    const user: any = localStorage?.getItem('user');
    const userObj: any = JSON?.parse(user);
    const token = userObj?.data.token;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.post(this.apiUrl+'updatePost/'+id, data, { headers: headers })
  }

  deletePosts(id: Array<any>){
    const user: any = localStorage?.getItem('user');
    const userObj: any = JSON?.parse(user);
    const token = userObj?.data.token;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.post(this.apiUrl+'deletePost/'+id, id, { headers: headers })
  }

  deleteSelectedPosts(id: any){
    const user: any = localStorage?.getItem('user');
    const userObj: any = JSON?.parse(user);
    const token = userObj?.data.token;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    const data={
      id:id,
    }
    return this.http.post(this.apiUrl+'deleteSelectedPosts', data, { headers: headers })
  }

  StatusSelectedPosts(id: any, status:string){
    const user: any = localStorage?.getItem('user');
    const userObj: any = JSON?.parse(user);
    const token = userObj?.data.token;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    const data={
      id:id,
      post_status:status
    }
    return this.http.post(this.apiUrl+'statusSelectedPosts', data, { headers: headers })
  }

  private  _listners = new Subject<any>();
  listen(): Observable<any>{
    return this._listners.asObservable();
  }

  filter(filterBy: String){
    this._listners.next(filterBy);
  }


  comment(user_id:any, post_id:any, comment_content:any){
    const data={
      user_id:user_id,
      post_id:post_id,
      comment_content:comment_content,
    }
    return this.http.post(this.apiUrl+'addComment', data)
  }
  replycomment(user_id:any, post_id:any, comment_id:any ,comment_content:any){
    const data={
      user_id:user_id,
      post_id:post_id,
      comment_id:comment_id,
      comment_content:comment_content,
    }
    return this.http.post(this.apiUrl+'addReplyComment', data)
  }


  getcomment(id:any){
    return this.http.get(this.apiUrl+'getComment/'+id);
  }

  getreplycomment(id:any){
    return this.http.get(this.apiUrl+'getReplyComment/'+id);
  }

  like(user_id:any, post_id:any){
    const data={
      user_id:user_id,
      post_id:post_id,
    }
    return this.http.post(this.apiUrl+'like', data);
  }

  dislike(user_id:any, post_id:any){
    const data={
      user_id:user_id,
      post_id:post_id,
    }
    return this.http.post(this.apiUrl+'dislike', data);
  }

  getCount(post_id:any){
    const data={
      post_id:post_id,
    }
    return this.http.post(this.apiUrl+'AllCount', data);
  }
}
