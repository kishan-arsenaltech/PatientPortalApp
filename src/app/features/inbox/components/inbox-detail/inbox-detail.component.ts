import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxItem } from '../../models/inbox-item.model';

@Component({
  selector: 'app-inbox-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inbox-detail.component.html',
  styleUrls: ['./inbox-detail.component.css']
})
export class InboxDetailComponent {
  @Input() item: InboxItem | undefined;
  @Input() tabs: any[] = [];
  
  @Output() selectTab = new EventEmitter<string>();
}
