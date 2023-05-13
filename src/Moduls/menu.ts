import {Component} from "@angular/core";

@Component({
  selector: 'app-menu',
  template: `
    <nav>
      <div class="flex flex-col items-stretch w-16 px-2 py-3 mt-3 space-y-4">
        <a href="/" class="text-white bg-gray-500 hover:bg-gray-600 rounded-md px-2.5 py-2"><img src="favicon.ico" alt="favicon"></a>
        <a href="/" class="text-white bg-gray-500 hover:bg-gray-600 rounded-md px-2.5 py-2"><img src="../assets/ChatAlien.svg" alt="Chat"></a>
      </div>
    </nav>
  `
})

export class AppMenuComponent{}
