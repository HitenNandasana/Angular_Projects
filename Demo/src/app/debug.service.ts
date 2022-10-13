import { Injectable } from '@angular/core';

@Injectable()
export class DebugService {

  constructor() { }

  info(message : String) : void { 
    console.log(message); 
 }
}
