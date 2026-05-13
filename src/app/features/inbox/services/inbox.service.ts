import { Injectable, signal } from '@angular/core';
import { InboxItem } from '../models/inbox-item.model';

@Injectable({
  providedIn: 'root'
})
export class InboxService {
  private items = signal<InboxItem[]>([
    { id: '10348', unread: true, title: 'CPAP supply replenishment', who: 'Mountain View Sleep', snippet: 'Patient is ready for quarterly resupply. See attached RX and last setup notes.', time: '1:44 PM', tag: 'warning', tagLabel: 'Action', isActionRequired: true },
    { id: '10347', unread: true, title: 'New referral — oxygen setup', who: 'Dr. K. Patel / Austin', snippet: 'New patient referred for oxygen home setup. Requires initial eval.', time: '1:12 PM', tag: 'primary', tagLabel: 'Referral' },
    { id: '10346', unread: true, title: 'Eligibility response received', who: 'Aetna', snippet: 'Approval for HCPCS E0601 confirmed through 04-30-2026.', time: '12:58 PM', tag: 'success', tagLabel: 'Eligibility' },
    { id: '10345', unread: false, title: 'Refund request — $240.00', who: 'Billing · J. Bradbury', snippet: 'Patient overpaid for March invoice. Requesting review.', time: '12:01 PM', tag: 'magenta', tagLabel: 'Refund' },
    { id: '10344', unread: true, title: 'PAP compliance flag', who: 'Adherence system', snippet: 'Usage below 4 hours/night for 12 of last 30 nights. Outreach required.', time: '11:33 AM', tag: 'danger', tagLabel: 'Compliance', isActionRequired: true },
    { id: '10343', unread: false, title: 'Audit response required', who: 'Humana', snippet: 'Requesting documentation packet for claim 87-002194 by 02-05.', time: '11:05 AM', tag: 'warning', tagLabel: 'Audit' },
    { id: '10342', unread: false, title: 'Delivery confirmation', who: 'Austin branch', snippet: 'Order SO-44218 delivered to patient; signature on file.', time: '10:48 AM', tag: 'success', tagLabel: 'Delivered' },
    { id: '10341', unread: true, title: 'New fax — sleep study result', who: 'Dr. Moreno', snippet: 'Pg 1 of 4 — AHI 22.4, diagnosis: OSA moderate.', time: '10:22 AM', tag: 'primary', tagLabel: 'New Fax' },
    { id: '10340', unread: false, title: 'Patient callback request', who: 'Patient portal', snippet: 'Mrs. Alvarez requests a callback regarding her mask replacement.', time: '10:04 AM', tag: '', tagLabel: '' },
    { id: '10339', unread: false, title: 'Denied claim resubmit', who: 'BCBS', snippet: 'Original claim denied with reason code 97. Resubmit with medical records.', time: 'Yesterday', tag: 'danger', tagLabel: 'Denied' },
    { id: '10338', unread: false, title: 'New referral — walker setup', who: 'Ortho Partners', snippet: 'Post-surgical walker needed for 6-week recovery.', time: 'Yesterday', tag: 'primary', tagLabel: 'Referral' },
    { id: '10337', unread: false, title: 'Insurance verification pending', who: 'Humana', snippet: 'Waiting on response since 01-26-2026.', time: '2 days ago', tag: 'warning', tagLabel: 'Pending' },
    { id: '10336', unread: false, title: 'Equipment return scheduled', who: 'Logistics', snippet: 'Pickup of rental CPAP scheduled for 02-03-2026.', time: '2 days ago', tag: '', tagLabel: '' },
    { id: '10335', unread: false, title: 'Monthly compliance report', who: 'System', snippet: 'January compliance report generated for Austin market.', time: '3 days ago', tag: 'success', tagLabel: 'Report' },
  ]);

  getInboxItems() {
    return this.items.asReadonly();
  }

  markAsRead(id: string) {
    this.items.update(items => items.map(item => 
      item.id === id ? { ...item, unread: false } : item
    ));
  }
}
