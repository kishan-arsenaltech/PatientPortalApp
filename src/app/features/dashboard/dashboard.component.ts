import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { DashboardService } from './services/dashboard.service';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { AppTileComponent } from './components/app-tile/app-tile.component';
import { QuickLinksComponent } from './components/quick-links/quick-links.component';
import { ActivityFeedComponent } from './components/activity-feed/activity-feed.component';
import { AskPortalModalComponent } from './components/ask-adapt-modal/ask-adapt-modal.component';
import { DashboardSummary } from './models/dashboard-summary.model';
import { AppTile } from './models/app-tile.model';
import { QuickLinkGroup } from './models/quick-link.model';
import { ActivityItem } from './models/activity-item.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HeroCardComponent,
    AppTileComponent,
    QuickLinksComponent,
    ActivityFeedComponent,
    AskPortalModalComponent
  ],
  template: `
    <div style="max-width: 1440px; margin: 0 auto; padding: 20px;">
      
      <!-- Hero -->
       <app-hero-card [summary]="summary$ | async"></app-hero-card> 

      <!-- Apps -->
      <div class="page-head" style="margin-bottom: 14px;">
        <div>
          <h2 class="page-title" style="font-size:15px;">Applications</h2>
          <p class="page-subtitle" style="font-size:13px;">Jump into the modules you use every day.</p>
        </div>
        <a href="#" class="link">Customize →</a>
      </div>

      <div class="tile-grid" style="margin-bottom: 28px;">
        <app-app-tile *ngFor="let tile of tiles$ | async" [tile]="tile"></app-app-tile>
      </div>

      <!-- Two-column row: Quick Links + Activity -->
      <div style="display: grid; grid-template-columns: 1.6fr 1fr; gap: 18px;">
        <app-quick-links [groups]="quickLinks$ | async"></app-quick-links>
        <app-activity-feed [activities]="activities$ | async"></app-activity-feed>
      </div>

    </div>

    <!-- Ask Portal Modal -->
    <app-ask-portal-modal></app-ask-portal-modal>
  `
})
export class DashboardComponent implements OnInit {
  summary$!: Observable<DashboardSummary>;
  tiles$!: Observable<AppTile[]>;
  quickLinks$!: Observable<QuickLinkGroup[]>;
  activities$!: Observable<ActivityItem[]>;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.summary$ = this.dashboardService.getSummary();
    this.tiles$ = this.dashboardService.getAppTiles();
    this.quickLinks$ = this.dashboardService.getQuickLinks();
    this.activities$ = this.dashboardService.getActivityFeed();
  }
}
