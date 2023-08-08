import { Component } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  // ngOnInit() {
  //   let oldURL1 = document.referrer;
  //   alert(oldURL1);
  // }
  constructor(
    public router: Router
  ) {
  }

  ngOnInit() {
    let oldURL1 = document.referrer;
    alert(oldURL1);
    this.router.events
      .pipe(filter((e: any) => e instanceof RoutesRecognized),
        pairwise()
      ).subscribe((e: any) => {
        console.log(oldURL1 + e[0].urlAfterRedirects); // previous url
      });
  }
}
