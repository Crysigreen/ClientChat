import {Component, ElementRef, OnInit, QueryList, ViewChildren} from "@angular/core";
import {MessageService} from "../../Services/message.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {UserService} from "../../Services/user.service";
import {Users} from "../../Models/users";
import {ChatService} from "../../Services/chat.service";
import {AuthService} from "../../Services/auth.service";
import {MessageHistory} from "../../Models/message-history";
import {Subject, takeUntil} from "rxjs";

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
        <div class="text-2xl font-bold text-white">{{ userName }}</div>
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
        <div *ngFor="let message of currentChatHistory" [ngClass]="{'flex-row-reverse': message.from === MyName, 'flex-row': message.from !== MyName}" class="flex justify-between" #messageElement>
          <div class="bg-[#3d65ff] rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl px-4 py-2 mb-2 inline-block max-w-xs whitespace-normal break-words">
            <div class="text-white">{{ message.content }}</div>
            <div class="text-xs text-white">{{ message.timestamp | date:'hh:mm' }}</div>
          </div>
        </div>
<!--        <div *ngFor="let message of currentChatHistory" class="flex justify-end" #messageElement>-->
<!--          <div [ngClass]="{'ml-auto': message.from === MyName}"-->
<!--               class="bg-[#3d65ff] rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl px-4 py-2 mb-2 inline-block max-w-xs whitespace-normal break-words">-->
<!--            <div class="text-white">{{ message.content }}</div>-->
<!--            <div class="text-xs text-white">{{ message.timestamp | date:'hh:mm' }}</div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
  `

})
export class ChatWindowComponent implements OnInit {
  @ViewChildren('messageElement') messageElements!: QueryList<ElementRef>;
  public currentChatHistory: MessageHistory[] = [];
  MyName= this.authService.username;
  userId!: string | null;
  userName!: string | null;
  Friend!: string;
  constructor(private messageService: MessageService, private route: ActivatedRoute, private userService: UserService,private chatService: ChatService, private authService: AuthService) {}
  ngOnInit() {
    // this.chatService.startConnection(this.authService.username);
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.route.queryParamMap.subscribe((queryParams: ParamMap) => {
      this.userName = queryParams.get('username');
    });
    this.route.queryParams.subscribe(params => {
      this.Friend = params['username'];

      if (this.Friend) {
        this.chatService.getChatHistory(this.Friend)
          .pipe(takeUntil(this.onDestroy))
          .subscribe((history) => {
            this.currentChatHistory = history;

            // After the chat history is loaded, subscribe to new messages
            this.chatService.getChatUpdates(this.Friend)
              .pipe(takeUntil(this.onDestroy))
              .subscribe((newMessages) => {
                this.currentChatHistory = newMessages;
              });
          });
      }


      // if (this.Friend) {
      //   this.chatService.getChatHistory(this.Friend)
      //     .pipe(takeUntil(this.onDestroy))
      //     .subscribe((history) => {
      //       this.currentChatHistory = history;
      //     });
      // }
    });





    // this.chatService.selectedUser$
    //   .pipe(takeUntil(this.onDestroy))
    //   .subscribe((username) => {
    //     this.userName = username;
    //     if (username) {
    //       this.chatService.getChatHistory(username)
    //         .pipe(takeUntil(this.onDestroy))
    //         .subscribe((history) => {
    //           this.currentChatHistory = history;
    //         });
    //     }
    //   });
    // this.currentChatHistory = this.messageService.getMessages();
    setTimeout(() => {
      this.scrollToBottom();
    }, 0);
  }

  private onDestroy = new Subject<void>();

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  // public selectChat(friendUsername: string): void {
  //   this.chatService.getChatHistory(friendUsername)
  //     .pipe(takeUntil(this.onDestroy))
  //     .subscribe((history) => {
  //       this.currentChatHistory = history;
  //     });
  // }

  scrollToBottom(): void {
    this.messageElements.changes.subscribe(() => {
      this.scrollToBottomSmooth();
    });
  }

  // getUserInfo(): void {
  //   if (this.userId) {
  //     this.userService.getUserById(this.userId)
  //       .subscribe((user: Users) => {
  //         this.userName = user.username; // Предположим, что в объекте User есть свойство name
  //       });
  //   }
  // }

  scrollToBottomSmooth(): void {
    const messageElementsArray = this.messageElements.toArray();
    if (messageElementsArray.length > 0) {
      const lastMessageElement = messageElementsArray[messageElementsArray.length - 1].nativeElement;
      lastMessageElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }
  /*messages: { content: string, from: string, timestamp: Date }[] = [    { content: 'Hi, how are you?', from: 'me', timestamp: new Date() },    { content: 'I\'m good, thanks. How about you?', from: 'Alice', timestamp: new Date() },    { content: 'I\'m doing well, thanks for asking.', from: 'me', timestamp: new Date() },  ];
*/}
