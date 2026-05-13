import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InboxItem, BadgeType } from './models/inbox-item.model';
import { InboxService } from './services/inbox.service';
import { InboxListComponent } from './components/inbox-list/inbox-list.component';
import { InboxDetailComponent } from './components/inbox-detail/inbox-detail.component';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, RouterModule, InboxListComponent, InboxDetailComponent],
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  filters = [
    { label: 'All', count: 231, active: true },
    { label: 'Unread', count: 42, active: false },
    { label: 'Assigned to me', count: 18, active: false },
    { label: 'New Faxes', count: 86, active: false },
    { label: 'Escalated', count: 7, active: false },
    { label: 'Completed', count: 0, active: false },
  ];

  detailTabs = [
    { label: 'Document', active: true },
    { label: 'Activity', active: false },
    { label: 'Related orders', count: 3, active: false },
    { label: 'Notes', active: false },
  ];

  selectedItemId: string = '10348';
  isFiltersModalOpen: boolean = false;

  get inboxItems() {
    return this.inboxService.getInboxItems()();
  }

  get selectedItem(): InboxItem | undefined {
    return this.inboxItems.find(item => item.id === this.selectedItemId);
  }

  constructor(private inboxService: InboxService) { }

  ngOnInit(): void { }

  selectItem(id: string): void {
    this.selectedItemId = id;
    this.inboxService.markAsRead(id);
  }

  selectFilter(filterLabel: string): void {
    this.filters.forEach(f => f.active = f.label === filterLabel);
  }

  selectTab(tabLabel: string): void {
    this.detailTabs.forEach(t => t.active = t.label === tabLabel);
  }

  toggleFiltersModal(isOpen: boolean): void {
    this.isFiltersModalOpen = isOpen;
  }

  getBadgeClass(tag: BadgeType): string {
    const classes: Record<string, string> = {
      primary: 'badge-primary',
      success: 'badge-success',
      warning: 'badge-warning',
      danger: 'badge-danger',
      magenta: 'badge-magenta'
    };
    return classes[tag] || '';
  }
}
