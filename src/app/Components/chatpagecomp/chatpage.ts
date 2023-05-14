import {Component, ElementRef, QueryList, ViewChildren} from "@angular/core";
import {MessageService} from "../../Services/message.service";


type Message = {
  content: string;
  from: string;
  timestamp: Date;
};

@Component({
  selector: 'app-chat-window',
  template: `
    <div class="bg-[#202329] flex flex-col h-full">
      <div class="bg-[#202329] h-20 px-5 py-5 flex justify-between items-center">
        <div class="text-2xl font-bold text-white">{{ chatPartner }}</div>
        <div class="space-x-5">
          <button class="px-2 py-1 rounded-full">
            <img src="../../../assets/phone.png" alt="video call" class="w-6 h-6">
          </button>
          <button class="px-2 py-1 rounded-full">
            <img src="../../../assets/dots-vertical.png" alt="call" class="w-6 h-6">
          </button>
        </div>
      </div>
      <div class="flex-grow overflow-y-auto px-4 py-2">
        <div *ngFor="let message of messages" class="flex justify-end" #messageElement>
          <div [ngClass]="{'ml-auto': message.from === 'me'}"
               class="bg-[#3d65ff] rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl px-4 py-2 mb-2 inline-block max-w-xs whitespace-normal break-words">
            <div class="text-white">{{ message.content }}</div>
            <div class="text-xs text-white">{{ message.timestamp | date:'hh:mm' }}</div>
          </div>
        </div>
      </div>
    </div>
  `

})
export class ChatWindowComponent {
  @ViewChildren('messageElement') messageElements!: QueryList<ElementRef>;
  messages: Message[] = [];
  constructor(private messageService: MessageService) {}
  ngOnInit() {
    this.messages = this.messageService.getMessages();
    setTimeout(() => {
      this.scrollToBottom();
    }, 0);
  }
  scrollToBottom(): void {
    this.messageElements.changes.subscribe(() => {
      this.scrollToBottomSmooth();
    });
  }

  scrollToBottomSmooth(): void {
    const messageElementsArray = this.messageElements.toArray();
    if (messageElementsArray.length > 0) {
      const lastMessageElement = messageElementsArray[messageElementsArray.length - 1].nativeElement;
      lastMessageElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }
  chatPartner: string = 'Vladimir';
  /*messages: { content: string, from: string, timestamp: Date }[] = [    { content: 'Hi, how are you?', from: 'me', timestamp: new Date() },    { content: 'I\'m good, thanks. How about you?', from: 'Alice', timestamp: new Date() },    { content: 'I\'m doing well, thanks for asking.', from: 'me', timestamp: new Date() },  ];
*/}
