import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, NotificationType } from './notification.service';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-notification-panel',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  templateUrl: './notification-panel.component.html'
})
export class NotificationPanelComponent {
  constructor(public notificationService: NotificationService) { }

  getIcon(type: NotificationType): string {
    const icons: any = {
      success: '<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10l4 4 8-8"/></svg>',
      warning: '<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3l8 14H2z"/><path d="M10 9v3M10 14.5v.5"/></svg>',
      error: '<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7"/><path d="M7 7l6 6M13 7l-6 6"/></svg>',
      info: '<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7"/><path d="M10 6v4M10 13.5v.5"/></svg>',
    };
    return icons[type] || icons.info;
  }
}
