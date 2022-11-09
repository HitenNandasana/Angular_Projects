import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  add(data: FormData) {
    // let token = localStorage.getItem('Token');
    // let header = new HttpHeaders().set(
    //   "Authorization", 'Bearer' + token
    // )
    //   .set('Content-Type', 'application/json');
    // let headers = { headers: header };
    // console.log(header);
    return this.http.post<any>(environment.baseApi + 'products', data);
  }
}
