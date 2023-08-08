import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RoutingEncrypt';

  ngOnInit(){
    let ip = window.navigator.language;
    console.log(ip);
  }
}
