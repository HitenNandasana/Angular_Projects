import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { DesignUtilityService } from '../design-utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private designutility: DesignUtilityService,
    private route: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.designutility.loginUser.pipe(
      take(1),
      map(user => {
        if (user) {
          return true;
        }
        return this.route.createUrlTree(['']);
      })
    )
  }

}
