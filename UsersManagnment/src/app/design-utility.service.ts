import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {

  editMode = new BehaviorSubject<boolean>(false);
  user = new BehaviorSubject<any>('');
  loginUser = new BehaviorSubject<any>('');


  constructor() { }

  checkCredencial(form: any) {
    let logindata = JSON.parse(localStorage.getItem('register') || '');
    const userObj = logindata.find((obj: any) => obj.username === form.value.uname);
    if (userObj !== undefined) {
      if (userObj.password === form.value.password) {
        this.loginUser.next(userObj);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
