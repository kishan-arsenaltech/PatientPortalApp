import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastType } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html'
})
export class ToastComponent {
  constructor(public toastService: ToastService) { }

  getIcon(type: ToastType): string {
    const paths = {
      success: '<path d="M4 8l3 3 5-6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
      error: '<path d="M5 5l6 6M11 5l-6 6" stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/>',
      warning: '<path d="M8 4v5M8 11v.5" stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/>',
      info: '<path d="M8 7v4M8 4.5v.5" stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/>',
    };
    return `<svg viewBox="0 0 16 16" width="14" height="14">${paths[type] || paths.info}</svg>`;
  }
}
