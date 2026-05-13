import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityItem } from '../../models/activity-item.model';
import { SafeHtmlPipe } from '../../../../shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  templateUrl: './activity-feed.component.html',
  styleUrls: ['./activity-feed.component.css']
})
export class ActivityFeedComponent {
  @Input() activities: ActivityItem[] | null = [];
}
