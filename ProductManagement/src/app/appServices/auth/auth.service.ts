import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  signUp(data: FormData) {
    return this.http.post<any>(environment.baseApi + 'register', data);
  }

  signIn(data: FormData) {
    return this.http.post<any>(environment.baseApi + 'login', data);
  }

  setToken(token: any) {
    localStorage.setItem('Token', token);
  }

  getToken() {
    if (localStorage.getItem('Token')) {
      return true;
    } else {
      return false;
    }
  }
}
