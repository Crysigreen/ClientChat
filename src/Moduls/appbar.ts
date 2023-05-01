import {Component} from "@angular/core";

@Component({
  selector: 'app-appbar',
  template: `
    <nav class="bg-gray-800">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Десктопное меню -->
          <div class="hidden sm:flex sm:items-center sm:justify-between">
            <div class="flex-shrink-0">
              <!-- Здесь можно добавить логотип -->
              <a href="#" class="text-white text-xl font-semibold">Название чата</a>
            </div>
            <div class="hidden sm:block sm:ml-6">
              <div class="flex space-x-4">
                <!-- Ссылки на страницы -->
                <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Page 1</a>
                <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Page 2</a>
                <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Page 3</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Мобильное меню -->
      <div class="sm:hidden" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <!-- Ссылки на страницы -->
          <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Page 1</a>
          <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Page 2</a>
          <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Page 3</a>
        </div>
      </div>
    </nav>
  `
})

export class AppbarComponent{}
