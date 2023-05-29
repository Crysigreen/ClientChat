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
  constructor(private authService: AuthService) { }

  public newMessageReceived = new Subject<ChatMessage>();
  // Объект, содержащий историю чата для каждого пользователя.
  private chats: { [key: string]: ChatMessage[]; } = {};

  public startConnection = (username: string) => {
    // Инициализация SignalR соединения.
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7185/chatHub?username=${encodeURIComponent(username)}`)
      .build();

    // Начало соединения.
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));

    // Добавление слушателя для входящих сообщений.
    this.addTransferChartDataListener();
  }

  public addTransferChartDataListener = () => {
    // Когда получаем сообщение, добавляем его в соответствующий массив сообщений.
    this.hubConnection.on('ReceiveMessage', (data) => {
      const message = {
        content: data.content,
        from: data.from,
        to: data.to,
        timestamp: data.timestamp,  // опционально
      };

      if (this.chats[data.from]) {
        this.chats[data.from].push(message);
      } else {
        this.chats[data.from] = [message];
      }
      this.newMessageReceived.next(message);
      console.log('new message')
    });
  }

  // startConnection(): void {
  //   this.hubConnection = new HubConnectionBuilder()
  //     .withUrl('https://localhost:7185/chatHub') // URL, где запущен сервер SignalR
  //     .build();
  //
  //   this.hubConnection.start()
  //     .then(() => console.log('SignalR connection started'))
  //     .catch(err => console.error('Error while starting SignalR connection:', err));
  // }

  public sendMessage = (receiverUsername: string, message: string) => {

    const myMessage = {
      content: message,
      from: this.authService.MyId,  // предполагается, что myUsername хранит ваше имя пользователя
      to: receiverUsername,
      timestamp: new Date(),  // опционально
    };

    // Отправка сообщения через SignalR.
    this.hubConnection.invoke('SendMessage', receiverUsername, message).catch(err => console.error(err));

    if (this.chats[receiverUsername]) {
      this.chats[receiverUsername].push(myMessage);
    } else {
      this.chats[receiverUsername] = [myMessage];
    }

  }

  public getChatHistory = (username: string) => {
    // Получение истории чата для данного пользователя.
    return this.chats[username] || [];
  }

  // sendMessage(senderId: string, receiverId: string, content: string): void {
  //   this.hubConnection.invoke('SendMessage', senderId, receiverId, content)
  //     .catch(err => console.error('Error while sending message:', err));
  // }
  //
  // receiveMessage(callback: (message: any) => void): void {
  //   this.hubConnection.on('ReceiveMessage', callback);
  // }
}
