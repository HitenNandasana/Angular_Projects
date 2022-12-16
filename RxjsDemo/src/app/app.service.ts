import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, throwIfEmpty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  print(val: any, id: any) {
    let el = document.createElement('li');
    el.innerText = val;

    document.getElementById(id)?.appendChild(el);
  }

  handleError(err: HttpErrorResponse) {
    let errMsg = '';
    if (!err.error) {
      errMsg = 'Somthing went Wrong, Please try after some time';
    } else {
      errMsg = 'Please try again.'
    }
    return throwError(errMsg)
  }
}
