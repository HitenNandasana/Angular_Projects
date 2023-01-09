import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ServerSideRenderingDemo';
  photos: any;
  posts: any

  constructor(private http: HttpClient) {
    this.http.get('https://jsonplaceholder.typicode.com/photos').subscribe(res => {
      console.log(res);
      this.photos = res;
    })
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(res => {
      console.log(res);
      this.posts = res;
    })
  }
}
