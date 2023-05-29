import {Component, OnInit} from '@angular/core';
import {UserService} from "../../Services/user.service";
import {Users} from "../../Models/users";
import {Router} from "@angular/router";
import {ChatService} from "../../Services/chat.service";
import {ChatWindowComponent} from "../chatpagecomp/chatpage";
import {MessageService} from "../../Services/message.service";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  users: Users[] = [];

  constructor(private userService: UserService, private router: Router, private chatService: ChatService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  // Загрузка списка пользователей
  loadUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

  openChat(user: Users): void {
    // Здесь можно выполнить действия при открытии чата с пользователем,
    if (user.username) {
      this.chatService.selectUser(user.username);
      // this.messageService.selectChat(user.username)
      // Redirect the user to the chat page with the selected user
      this.router.navigate(['/chats', user.id], { queryParams: { username: user.username } } );
    }
    // например, перенаправить пользователя на страницу чата с выбранным пользователем.
  }

}
