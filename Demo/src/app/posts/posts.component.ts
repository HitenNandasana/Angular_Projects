import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private postservice: PostsService) { }

  postdata: any;
  load = false;

  ngOnInit(): void {
    this.postservice.getposts()
      .subscribe(data => this.postdata = data);
    this.load = true
  }

  edit(title: any, postdata: any) {
    postdata.title = title;
  }

  delete(id: any) {
    // this.postservice.deleteposts(id)
    //   .subscribe(res => console.log(res));
    this.postdata.splice(id, 1);
    console.log(id);
    console.log("hiten");
    console.log("sagar");
    console.log("sagarfdf");
    console.log("abc");
  }

}
