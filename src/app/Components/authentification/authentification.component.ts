import { Component } from '@angular/core';
import {AuthService} from "../../Services/auth.service";
import { Router } from '@angular/router';
import {ChatService} from "../../Services/chat.service";

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent {

  id: string = '';
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router: Router, private chatService: ChatService) {}

  login(): void {
    // Выполняйте аутентификацию пользователя
    this.authService.login(this.username, this.password).subscribe(
      user => {
        // this.authService.MyId=user.id;
        // this.authService.MyUsername=user.username;
        this.chatService.startConnection(this.authService.MyUsername);
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
