import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white shadow-lg rounded-lg p-6 m-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {} 