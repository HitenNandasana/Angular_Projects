import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  ediProductObj = new BehaviorSubject<any>('');

  constructor(private http: HttpClient,
    private route: Router,
    private toastr: ToastrService) { }

  setProductData(data: any) {
    localStorage.setItem('Product', JSON.stringify(data));
  }

  getProductData() {
    return JSON.parse(localStorage.getItem('Product') || '');
  }

  add(data: FormData, imagename: any) {
    this.http.post<any>(environment.baseApi + 'products', data).subscribe(res => {
      console.log(res);
      let dataList = this.getProductData();
      let object = res.data;
      object.imgName = imagename;
      dataList.push(object);
      this.setProductData(dataList);
      this.route.navigate(['dashboard/product']);
      this.toastr.success('Product added successfully');
    });
  }

  update(data: FormData) {
    this.http.post<any>(environment.baseApi + 'products/update', data).subscribe(res => {
      console.log(res);
      let dataList = this.getProductData();
      let arr = dataList.map((obj: any) => {
        if (obj.id === Number(data.get('id'))) {
          let object = res.data;
          object.imgName = obj.imgName;
          return object;
        }
        return obj;
      })
      this.setProductData(arr);
      this.route.navigate(['dashboard/product']);
      this.toastr.success('Product updated successfully');
    });
    this.ediProductObj.next('');
  }

  delete(i: any, obj: any) {
    this.http.post<any>(environment.baseApi + 'products/delete', obj).subscribe(res => {
      console.log(res);
    })
    let data = this.getProductData();
    data.splice(i, 1);
    this.setProductData(data);
  }
}
