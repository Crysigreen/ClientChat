import {Component, OnInit} from '@angular/core';
import {MessageService} from "../app/Services/message.service";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {ChatService} from "../app/Services/chat.service";
import {AuthService} from "../app/Services/auth.service";
import {ActivatedRoute, ParamMap} from "@angular/router";


type Message = {
  content: string;
  from: string;
  timestamp: Date;
};

@Component({
  selector: 'app-chat-input',
  template: `
    <div class="bg-[#202329] p-4">
      <form (ngSubmit)="sendMessage(receiverUsername,content)" class="flex">
        <input [(ngModel)]="content" name="message" type="text" placeholder="Your message"
               class="w-full bg-[#202329] px-2 py-1 outline-0 text-gray-200 rounded-md">
        <button type="submit" class="px-4 py-2 rounded-md">
          <img src="../assets/send.png" alt="video call" class="w-6 h-6">
        </button>
      </form>
    </div>
  `,
})
export class ChatInputComponent implements OnInit {

  MyID:string='6469574935f544f37497aaa2';
  receiverId:string ='64695f7935f544f37497aaa5';
  receiverUsername: string ='';
  ngOnInit() {
    this.MyID = this.authService.MyId;
    let receiverId = this.route.snapshot.paramMap.get('userId');
    this.route.queryParams.subscribe(params => {
      this.receiverUsername = params['username'];
    });
  }

// Отправка сообщения
//   sendMessage(user: string, message: string) {
//     const from = 'me';
//     const timestamp = new Date();
//     const newMessage: Message = { content: this.message, from, timestamp };
//     this.messageService.addMessage(newMessage);
//
//     this.hubConnection.invoke('SendMessage', user, message);
//
//     this.message = '';
//   }

  content: string = '';
  constructor(private messageService: MessageService, private chatService: ChatService,private authService: AuthService,private route: ActivatedRoute) {}

  sendMessage( receiverUsername: string, content: string): void {
    // Отправьте сообщение
    this.chatService.sendMessage(receiverUsername, content);
  }

  // sendMessage() {
  //   const from = 'me';
  //   const timestamp = new Date();
  //   this.chatService.sendMessage(content);
  //
  //   const newMessage: Message = { content: this.message, from, timestamp };
  //   this.messageService.addMessage(newMessage);
  //
  //   // Дополнительная логика, например, обновление списка сообщений или отправка на сервер
  //
  //   // Очистка поля ввода сообщения
  //   this.message = '';
  // }
}
