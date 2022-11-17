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

  id = new BehaviorSubject<Number>(0);
  editCategoryObj = new BehaviorSubject<any>('');

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
    obj.id = id;
    await this.db.object(`CategoryData/${id}`).set(obj);
    this.toastr.success('Data added successfully');
    this.route.navigate(['main/category']);
  }

  async delete(data: any) {
    await this.db.object(`CategoryData/${data.id}`).remove();
    this.toastr.success('Data deleted successfully');
  }

  async update(obj: any) {
    await this.db.object(`CategoryData/${obj.id}`).set(obj);
    this.toastr.success('Data updated successfully');
    this.route.navigate(['main/category']);
    this.editCategoryObj.next('');
  }

  getCategoryData() {
    return new Promise((resolve, reject) => {
      this.db.list('CategoryData').valueChanges().subscribe(res => {
        if (res === undefined) {
          reject('data is empty');
        } else {
          resolve(res);
        }
      })

    });
  }
}
