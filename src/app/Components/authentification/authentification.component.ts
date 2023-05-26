import { Component } from '@angular/core';
import {AuthService} from "../../Services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent {

  id: string = '';
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  login(): void {
    // Выполняйте аутентификацию пользователя
    this.authService.login(this.id,this.username, this.password).subscribe(
      user => {
        this.authService.MyId=user.id;
        this.authService.username=user.username;
        this.router.navigate(['']);
        // Аутентификация успешна
        // Сохраните информацию о текущем пользователе, если необходимо
      },
      error => {
        // Обработайте ошибку аутентификации
      }
    );
  }
}
