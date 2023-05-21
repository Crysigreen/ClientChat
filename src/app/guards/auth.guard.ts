import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';
import { AuthService } from "../Services/auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      // Пользователь аутентифицирован, разрешаем доступ
      return true;
    } else {
      // Пользователь не аутентифицирован, перенаправляем на страницу входа
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
