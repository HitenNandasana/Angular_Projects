import { Injectable } from '@angular/core';
import { BehaviorSubject, single } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {

  editMode = new BehaviorSubject<boolean>(false);
  user = new BehaviorSubject<any>('');
  loginUser = new BehaviorSubject<any>('');
  loggedIn = new BehaviorSubject<any>('Login');


  constructor() { }

  checkCredencial(form: any) {
    let logindata = this.getRegisterData();
    const userObj = logindata.find((obj: any) => obj.username === form.value.uname);
    if (userObj !== undefined) {
      if (userObj.password === form.value.password) {
        this.loginUser.next(userObj);
        this.loggedIn.next('Logout');
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getSingleUserdata(userlist: any, userid: any) {
    const singleuser = userlist.find((obj: any) => obj.id === Number(userid));
    return singleuser;
  }

  getRegisterData() {
    let data = JSON.parse(localStorage.getItem('register') || '');
    return data;
  }
  setRegisterData(data: any) {
    localStorage.setItem('register', JSON.stringify(data));
  }

  getLoginData() {
    let data = localStorage.getItem('login');
    if (data) {
      return JSON.parse(data);
    } else {
      return false;
    }
  }
  setLoginData(data: any) {
    localStorage.setItem('login', JSON.stringify(data));
  }

  autoLogin() {
    let data = this.getLoginData();
    if (data) {
      this.loginUser.next(data);
      this.loggedIn.next('Logout');
    } else {
      this.loggedIn.next('Login');
      return;
    }
  }
}
