import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) subtitle!: string;
  @Input() breadcrumbParent = 'Referrals';
  @Input() breadcrumbCurrent = 'New referral';
  @Input() lastSavedLabel = '';
  @Input() showDraftBadge = false;

  @Output() discard = new EventEmitter<void>();
}
