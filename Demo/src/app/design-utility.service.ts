import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {

  constructor() { }

  username = new BehaviorSubject<any>('Hiten');

  changeName(temp: any) {
    this.username.next(temp.value)
  }
}
