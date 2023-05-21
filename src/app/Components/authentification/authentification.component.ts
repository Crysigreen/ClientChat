import { Component } from '@angular/core';
import {AuthService} from "../../Services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  login(): void {
    // Выполняйте аутентификацию пользователя
    this.authService.login(this.username, this.password).subscribe(
      user => {
        this.router.navigate(['/home']);
        // Аутентификация успешна
        // Сохраните информацию о текущем пользователе, если необходимо
      },
      error => {
        // Обработайте ошибку аутентификации
      }
    );
  }
}
