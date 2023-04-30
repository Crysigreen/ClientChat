import {Component} from "@angular/core";

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="flex flex-col w-64 py-4 h-screen bg-gray-800">
      <div class="flex items-center px-4">
        <img src="favicon.ico" alt="favicon" class="w-8 h-8 mr-2">
        <span class="text-white font-medium">My App</span>
      </div>
      <div class="mt-10 ml-5">
        <ul class="list-none">
          <li class="mb-4">
            <a href="#" class="text-white hover:text-gray-400">Home</a>
          </li>
          <li class="mb-4">
            <a href="#" class="text-white hover:text-gray-400">About</a>
          </li>
          <li class="mb-4">
            <a href="#" class="text-white hover:text-gray-400">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  `
})

export class SidebarComponent {}
