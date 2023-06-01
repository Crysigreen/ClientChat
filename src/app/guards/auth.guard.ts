import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router, RouterStateSnapshot, UrlTree
} from '@angular/router';
import { AuthService } from "../Services/auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuth = !!this.authService.token;

    if (!isAuth) {
      this.router.navigate(['/auth']);
    }

    return isAuth;
  }
}
