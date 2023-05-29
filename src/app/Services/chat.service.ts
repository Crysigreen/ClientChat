import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import * as signalR from '@aspnet/signalr';
import {AuthService} from "./auth.service";
import {Subject} from "rxjs";



export interface ChatMessage {
  content: string;
  from: string;
  to: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // private hubConnection!: HubConnection;
  private hubConnection!: signalR.HubConnection;
  private chats: { [key: string]: { messages: ChatMessage[], subject: Subject<ChatMessage[]> } } = {};

  constructor(private authService: AuthService) { }

  public startConnection(username: string): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7185/chatHub?username=${encodeURIComponent(username)}`)
      .build();

    this.hubConnection.on('ReceiveMessage', (data) => {
      const message: ChatMessage = {
        content: data.content,
        from: data.from,
        to: data.to,
        timestamp: new Date(data.timestamp)
      };

      if (!this.chats[data.from]) {
        this.chats[data.from] = { messages: [], subject: new Subject<ChatMessage[]>() };
      }

      this.chats[data.from].messages.push(message);
      this.chats[data.from].subject.next(this.chats[data.from].messages);
    });



    return this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  private selectedUserSubject = new Subject<string>();
  selectedUser$ = this.selectedUserSubject.asObservable();

  public selectUser(username: string): void {
    this.selectedUserSubject.next(username);
  }

  public sendMessage(receiverUsername: string, message: string): void {
    const myMessage: ChatMessage = {
      content: message,
      from: this.authService.MyId,  // предполагается, что MyId хранит ваше имя пользователя
      to: receiverUsername,
      timestamp: new Date(),
    };

    this.hubConnection.invoke('SendMessage', receiverUsername, message).catch(err => console.error(err));

    if (!this.chats[receiverUsername]) {
      this.chats[receiverUsername] = { messages: [], subject: new Subject<ChatMessage[]>() };
    }

    this.chats[receiverUsername].messages.push(myMessage);
    this.chats[receiverUsername].subject.next(this.chats[receiverUsername].messages);
  }

  public getChatHistory(username: string): Subject<ChatMessage[]> {
    if (!this.chats[username]) {
      this.chats[username] = { messages: [], subject: new Subject<ChatMessage[]>() };
    }

    return this.chats[username].subject;
  }
}
