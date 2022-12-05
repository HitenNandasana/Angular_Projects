import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MaterialUiDemo';

  constructor(private route: Router) {

  }
  onNavigate(path: string) {
    this.route.navigate([path]);
  }
}
