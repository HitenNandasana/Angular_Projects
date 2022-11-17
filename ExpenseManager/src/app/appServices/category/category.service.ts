import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CategoryData } from 'src/app/models/data';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  id = new BehaviorSubject<Number>(1);

  constructor(private route: Router,
    private db: AngularFireDatabase,
    private toastr: ToastrService
  ) { }

  async add(obj: any) {
    let id;
    this.id.subscribe(res => {
      id = res;
    })
    id = Number(id) + 1;
    await this.db.object(`CategoryData/${id}`).set(obj);
    this.toastr.success('Data added successfully');
    this.route.navigate(['main/category']);
  }

  getCategoryData() {
    return new Promise((resolve, reject) => {
      this.db.list('CategoryData').valueChanges().subscribe(res => {
        resolve(res);
      })
    })
  }
}
