import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastType } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container" *ngIf="toastService.toasts().length > 0">
      <div *ngFor="let toast of toastService.toasts()" class="toast toast-{{ toast.type }}" role="status">
        <span class="toast-icon" [innerHTML]="getIcon(toast.type)"></span>
        <div class="toast-body">
          <p class="toast-title">{{ toast.title }}</p>
          <p class="toast-msg">{{ toast.message }}</p>
        </div>
        <button class="toast-close" aria-label="Dismiss" (click)="toastService.remove(toast.id)">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 3l6 6M9 3L3 9"/></svg>
        </button>
      </div>
    </div>
  `
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  getIcon(type: ToastType): string {
    const paths = {
      success: '<path d="M4 8l3 3 5-6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
      error:   '<path d="M5 5l6 6M11 5l-6 6" stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/>',
      warning: '<path d="M8 4v5M8 11v.5" stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/>',
      info:    '<path d="M8 7v4M8 4.5v.5" stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/>',
    };
    return `<svg viewBox="0 0 16 16" width="14" height="14">${paths[type]||paths.info}</svg>`;
  }
}
