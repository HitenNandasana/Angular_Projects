import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  url = 'https://jsonplaceholder.typicode.com/posts'

  getposts(): Observable<any> {
    return this.http.get(this.url);
  }
  deleteposts(data: any): Observable<any> {
    return this.http.delete(`${this.url}/${data.id}`, data);
  }
}
