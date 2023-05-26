import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private hubConnection!: HubConnection;

  constructor() { }

  startConnection(): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5252/chathub') // URL, где запущен сервер SignalR
      .build();

    this.hubConnection.start()
      .then(() => console.log('SignalR connection started'))
      .catch(err => console.error('Error while starting SignalR connection:', err));
  }

  sendMessage(senderId: string, receiverId: string, content: string): void {
    this.hubConnection.invoke('SendMessage', senderId, receiverId, content)
      .catch(err => console.error('Error while sending message:', err));
  }

  receiveMessage(callback: (message: any) => void): void {
    this.hubConnection.on('ReceiveMessage', callback);
  }
}
