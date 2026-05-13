import { Injectable, signal, inject } from '@angular/core';
import { InboxItem } from '../models/inbox-item.model';
import { ReferralService } from '../../../core/services/referral.service';

@Injectable({
  providedIn: 'root'
})
export class InboxService {
  private referralService = inject(ReferralService);
  private items = signal<InboxItem[]>([]);

  constructor() {
    this.loadReferrals();
  }

  private loadReferrals() {
    this.referralService.getAll().subscribe({
      next: (backendReferrals) => {
        const uiItems: InboxItem[] = backendReferrals.map(r => ({
          id: r.referralID,
          unread: r.referralStatus === 'NEW',
          title: `Referral - ${r.orderType || 'General'}`,
          who: r.prescriberName || 'Unknown Provider',
          snippet: r.clinicalNotes || 'No notes provided.',
          time: new Date(r.receivedAt).toLocaleDateString(),
          tag: r.referralStatus === 'NEW' ? 'primary' : 'success',
          tagLabel: r.referralStatus,
          isActionRequired: r.priority === 'URGENT'
        }));
        this.items.set(uiItems);
      },
      error: (err) => console.error('Failed to load referrals', err)
    });
  }

  getInboxItems() {
    return this.items.asReadonly();
  }

  markAsRead(id: string) {
    this.items.update(items => items.map(item => 
      item.id === id ? { ...item, unread: false } : item
    ));
    
    // In a real app we might also call this.referralService.update() here
  }
}
