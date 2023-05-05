import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  template: `
    <div class="bg-white p-4">
      <form (ngSubmit)="sendMessage()" class="flex">
        <input [(ngModel)]="message" type="text" placeholder="Type your message here..." class="w-full px-2 py-1 border-gray-300 border rounded-md mr-2">
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Send</button>
      </form>
    </div>
  `,
})
export class ChatInputComponent {
  @Output() messageSent = new EventEmitter<string>();

  message: string = '';

  sendMessage() {
    if (this.message.trim() !== '') {
      this.messageSent.emit(this.message);
      this.message = '';
    }
  }
}
