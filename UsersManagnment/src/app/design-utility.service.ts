import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {

  editMode = new BehaviorSubject<boolean>(false);
  user = new BehaviorSubject<any>('');

  constructor() { }
}
