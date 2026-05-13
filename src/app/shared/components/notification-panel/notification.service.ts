import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  msg: string;
  time: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications = signal<NotificationItem[]>([]);
  private idCounter = 0;

  // Mock real-time feed
  private feed: Omit<NotificationItem, 'id'>[] = [
    { type: 'success', title: 'Referral submitted',        msg: 'Patient Roberto Martinez routed to Austin, TX branch.',  time: 'Just now' },
    { type: 'info',    title: 'Eligibility check complete', msg: 'BCBS PPO confirmed for HCPCS E0601 through 04-30-2026.',   time: '2 min ago' },
    { type: 'warning', title: 'Prior auth expiring',        msg: 'Auth for Janice Alvarez expires in 12 days. Renew now.',   time: '5 min ago' },
    { type: 'error',   title: 'Claim denied',               msg: 'Claim CLM-44103 denied — missing physician signature.',     time: '8 min ago' },
    { type: 'success', title: 'Order delivered',            msg: 'SO-44401 for Diana Ross confirmed delivered.',              time: '14 min ago' },
    { type: 'info',    title: 'Compliance flag',            msg: '3 patients below 4hr/night threshold — outreach needed.',  time: '20 min ago' },
  ];
  private index = 0;

  showNext(): void {
    const notif = this.feed[this.index % this.feed.length];
    this.index++;
    this.show(notif.type, notif.title, notif.msg, notif.time);
  }

  show(type: NotificationType, title: string, msg: string, time: string, duration = 5000): void {
    const id = `notif-${this.idCounter++}`;
    const newNotif: NotificationItem = { id, type, title, msg, time };
    
    // In Angular 16+, signal update callback
    this.notifications.update(current => [...current, newNotif]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  remove(id: string): void {
    this.notifications.update(current => current.filter(n => n.id !== id));
  }
}
