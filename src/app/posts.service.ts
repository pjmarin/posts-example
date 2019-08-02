import { Injectable } from '@angular/core';
import { Post } from './post';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  postsJsonServerUrl = '/posts';
  postJsonServerDeleteUrlo = '/deletePost';
  posts: Post[];
  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsJsonServerUrl);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.postsJsonServerUrl}/${id['id']}`);
  }

  createPost(ide: number, titlee: string) {
    console.log('create post parameters: ', ide, titlee);
    return this.http.post(
      `${this.postsJsonServerUrl}`,
      { id: ide, title: titlee, author: 'new author', btnText: 'edit', spanVisible: true, inputVisible: false });
  }

  updatePost(post: string): Observable<any> {
    // return this.http.post(`${this.postsJsonServerUrl}`, JSON.stringify({id: 4, title: 'title changed'}));
    console.log('valores que pasamos al update');
    console.log(post);
    return this.http.put(`${this.postsJsonServerUrl}/${post['post']['id']}`,
      { id: post['post']['id'], title: post['post']['title'], btnText: 'edit', spanVisible: true, inputVisible: false }
    );


    /*fetch('http://localhost:3000/posts/2', {
    method: 'PUT',
      body: JSON.stringify({
      id: 2,
      title: 'title changed'
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
  .then(response => response.json())
  .then(json => console.log(json))

    fetch('http://localhost:3000/posts', {
    method: 'GET',
  })
  .then(response => response.json())
  .then(json => console.log(json))*/


  }

}
