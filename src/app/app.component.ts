import {Component, OnInit} from '@angular/core';
import {ChatService} from "./Services/chat.service";
import {AuthService} from "./Services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ClientChat';

  constructor(private chatService: ChatService, private authService: AuthService) {}

  ngOnInit() {
    // Проверить, есть ли токен в localStorage

    const token = localStorage.getItem('auth-token');
    const MyUsername= localStorage.getItem('username');
    if (token && MyUsername) {
      // Если есть, восстановить токен и переподключиться
      this.authService.token = token;
      this.authService.MyUsername = MyUsername;
      this.authService.tokenSubject.next(token);
      this.chatService.startConnection(MyUsername);
    }
  }

}
