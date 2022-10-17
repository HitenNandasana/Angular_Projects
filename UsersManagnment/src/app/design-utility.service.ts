import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {

  editMode = new BehaviorSubject<boolean>(false);
  id = new BehaviorSubject<any>(1);

  constructor() { }
}
