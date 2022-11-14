import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/appServices/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private route: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  signout() {
    localStorage.removeItem('Token');
    this.toastr.success('Sign Out successfully');
    this.route.navigate(['']);
  }

}
