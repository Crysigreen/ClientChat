import {Component} from "@angular/core";

@Component({
  selector: 'app-menu',
  template: `
    <nav>
      <div class="flex">
        <a class="items-stretch mx-4 mt-4 mb-6 rounded-md px-2.5 py-2"><img src="favicon.ico" alt="favicon"></a>
      </div>
      <div class="flex flex-col items-stretch w-20 px-2 py-3 mt-3 space-y-4">
        <a href="/" class="text-white rounded-md flex flex-col items-center justify-center px-2.5 py-2">
          <img src="../assets/Chats3.svg" alt="All chats" class="h-8 w-8">
          <p class="font-extralight text-xs mt-1">All chats</p>
        </a>
<!--        <a href="/" class="text-white hover:bg-gray-600 rounded-md px-2.5 py-2"><img src="../assets/ChatAlien.svg" alt="Chat"></a>-->
      </div>
    </nav>
  `
})

export class AppMenuComponent{}
