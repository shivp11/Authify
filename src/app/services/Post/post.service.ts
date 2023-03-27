import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http:HttpClient) { }

  getPosts(){
    return this.http.get(this.apiUrl+'posts/')
  }

  addPost(post_title:string, post_image:File, post_author:string, post_status:string, post_content:any){
    const formData = new FormData();
    formData.append("post_image", post_image);
    const data={
      post_title:post_title,
      post_author:post_author,
      post_status:post_status,
      post_content:post_content,
      post_image:formData,
    }
    return this.http.post(this.apiUrl+'addPost', data)
  }

  updatePosts(id: any, post_title:string, post_author:string, post_status:string, post_content:any){
    const data={
      id:id,
      post_title:post_title,
      post_author:post_author,
      post_status:post_status,
      post_content:post_content,
    }
    return this.http.post(this.apiUrl+'updatePost/'+id, data)
  }

  deletePosts(id: any){
    const data={
      id:id,
    }
    return this.http.post(this.apiUrl+'deletePost/'+id, data)
  }
}
