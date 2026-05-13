import { Injectable, inject } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { DashboardSummary } from '../models/dashboard-summary.model';
import { AppTile } from '../models/app-tile.model';
import { ActivityItem } from '../models/activity-item.model';
import { QuickLinkGroup } from '../models/quick-link.model';
import { PatientService } from '../../../core/services/patient.service';
import { ReferralService } from '../../../core/services/referral.service';
import { OrderService } from '../../../core/services/order.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private patientService = inject(PatientService);
  private referralService = inject(ReferralService);
  private orderService = inject(OrderService);

  getSummary(): Observable<DashboardSummary> {
    return combineLatest([
      this.referralService.getPending(),
      this.patientService.getAll()
    ]).pipe(
      map(([pendingReferrals, allPatients]) => {
        return {
          inboxItems: pendingReferrals.length,
          auditsDueToday: 0,
          patientsThisWeek: allPatients.length,
          pendingRefundsAmount: '$0.00',
          systemsStatus: 'All systems operational',
          systemsDate: new Date().toLocaleDateString()
        };
      })
    );
  }

  getAppTiles(): Observable<AppTile[]> {
    return combineLatest([
      this.patientService.getAll(),
      this.orderService.getAll(),
      this.referralService.getPending()
    ]).pipe(
      map(([patients, orders, referrals]) => [
        {
          title: 'Adherence',
          description: 'Track patient compliance, usage trends, and outreach opportunities.',
          link: '/adherence',
          iconClass: 'bg-adherence',
          iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2 4 4 .5-3 3 1 4.5L12 12l-4 2 1-4.5-3-3 4-.5z"/></svg>',
          metaHtml: `<span class="badge-dot" style="background: var(--success);"></span> ${patients.length} patients`
        },
        {
          title: 'AuditShare',
          description: 'Review claims and complete audit forms collaboratively with payers.',
          link: '/audit-queue',
          iconClass: 'bg-audit',
          iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h10l4 4v12H5z"/><path d="M15 4v4h4M9 14l2 2 4-4"/></svg>',
          metaHtml: `<span class="badge badge-warning">${orders.length} orders</span>`
        },
        {
          title: 'Intake',
          description: 'Faxes, referrals, and new patient documents awaiting processing.',
          link: '/inbox',
          iconClass: 'bg-intake',
          iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14l3-9h12l3 9M3 14v5a1 1 0 001 1h16a1 1 0 001-1v-5M3 14h5l1 3h6l1-3h5"/></svg>',
          metaHtml: `<span class="badge badge-magenta">${referrals.length} new</span>`
        }
      ])
    );
  }

  getQuickLinks(): Observable<QuickLinkGroup[]> {
    // Keep empty or minimal static links
    return new Observable<QuickLinkGroup[]>(observer => {
      observer.next([
        {
          title: 'Applications',
          iconSvg: '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="2" width="12" height="12" rx="1.5"/><path d="M5 8h6M5 11h4"/></svg>',
          links: [
            { label: 'AuditShare', href: '/audit-queue' },
            { label: 'Intake', href: '/inbox' },
            { label: 'Adherence', href: '/adherence' }
          ]
        }
      ]);
      observer.complete();
    });
  }

  getActivityFeed(): Observable<ActivityItem[]> {
    return new Observable<ActivityItem[]>(observer => {
      observer.next([]);
      observer.complete();
    });
  }
}
