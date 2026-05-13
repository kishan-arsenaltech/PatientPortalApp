import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxItem, BadgeType } from '../../models/inbox-item.model';

@Component({
  selector: 'app-inbox-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inbox-list.component.html',
  styleUrls: ['./inbox-list.component.css']
})
export class InboxListComponent {
  @Input() items: InboxItem[] = [];
  @Input() selectedId: string = '';
  @Input() filters: any[] = [];
  
  @Output() selectItem = new EventEmitter<string>();
  @Output() openFilters = new EventEmitter<void>();
  @Output() filterChange = new EventEmitter<string>();

  selectFilter(label: string) {
    this.filterChange.emit(label);
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
