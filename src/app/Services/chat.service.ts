import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // private hubConnection!: HubConnection;
  private hubConnection!: signalR.HubConnection;
  constructor() { }

  // Объект, содержащий историю чата для каждого пользователя.
  private chats: { [key: string]: string[]; } = {};

  public startConnection = (username: string) => {
    // Инициализация SignalR соединения.
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7185/chatHub', {
        accessTokenFactory: () => `username=${encodeURIComponent(username)}`
      })
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
    this.hubConnection.on('ReceiveMessage', (senderUsername, message) => {
      if (!(senderUsername in this.chats)) {
        this.chats[senderUsername] = [];
      }
      console.log('new message')
      this.chats[senderUsername].push(message);
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
    // Отправка сообщения через SignalR.
    this.hubConnection.invoke('SendMessage', receiverUsername, message).catch(err => console.error(err));
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
