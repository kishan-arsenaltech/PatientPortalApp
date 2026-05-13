import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { DashboardSummary } from '../models/dashboard-summary.model';
import { AppTile } from '../models/app-tile.model';
import { ActivityItem } from '../models/activity-item.model';
import { QuickLinkGroup } from '../models/quick-link.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  getSummary(): Observable<DashboardSummary> {
    return of({
      inboxItems: 23,
      auditsDueToday: 4,
      patientsThisWeek: 128,
      pendingRefundsAmount: '$12.4k',
      systemsStatus: 'All systems operational',
      systemsDate: 'Tuesday, Apr 22'
    }).pipe(delay(400));
  }

  getAppTiles(): Observable<AppTile[]> {
    return of([
      {
        title: 'Adherence',
        description: 'Track patient compliance, usage trends, and outreach opportunities.',
        link: '/adherence',
        iconClass: 'bg-adherence',
        iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2 4 4 .5-3 3 1 4.5L12 12l-4 2 1-4.5-3-3 4-.5z"/></svg>',
        metaHtml: '<span class="badge-dot" style="background: var(--success);"></span> 12 new signals today'
      },
      {
        title: 'AuditShare',
        description: 'Review claims and complete audit forms collaboratively with payers.',
        link: '/audit-queue',
        iconClass: 'bg-audit',
        iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h10l4 4v12H5z"/><path d="M15 4v4h4M9 14l2 2 4-4"/></svg>',
        metaHtml: '<span class="badge badge-warning">4 due today</span>'
      },
      {
        title: 'Manage',
        description: 'Invoice queues, assignments, and market-level work management.',
        link: '#',
        iconClass: 'bg-manage',
        iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 10h18M8 5v14"/></svg>',
        metaHtml: '<span class="badge-dot" style="background: var(--primary-400);"></span> 218 open invoices'
      },
      {
        title: 'Intake',
        description: 'Faxes, referrals, and new patient documents awaiting processing.',
        link: '/inbox',
        iconClass: 'bg-intake',
        iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14l3-9h12l3 9M3 14v5a1 1 0 001 1h16a1 1 0 001-1v-5M3 14h5l1 3h6l1-3h5"/></svg>',
        metaHtml: '<span class="badge badge-magenta">23 new</span>'
      },
      {
        title: 'Master Balance',
        description: 'Reconcile branch-level balances across billing periods.',
        link: '#',
        iconClass: 'bg-master',
        iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M7 8h10M7 12h10M7 16h6"/></svg>',
        metaHtml: 'Updated 8 min ago'
      },
      {
        title: 'Refund Approvals',
        description: 'Review and approve refund requests across the organization.',
        link: '#',
        iconClass: 'bg-refund',
        iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v14m0 0l-5-5m5 5l5-5"/><path d="M4 20h16"/></svg>',
        metaHtml: '<span class="badge badge-danger">7 need sign-off</span>'
      },
      {
        title: 'Workflow',
        description: 'Build and monitor automated handoffs between teams.',
        link: '#',
        iconClass: 'bg-workflow',
        iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8 8l3 8M16 8l-3 8"/></svg>',
        metaHtml: '3 running'
      },
      {
        title: 'Reports',
        description: 'Saved queries and scheduled exports across every module.',
        link: '#',
        iconClass: 'bg-reports',
        iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V8M10 20V4M16 20v-9M4 20h16"/></svg>',
        metaHtml: '42 saved reports'
      }
    ]).pipe(delay(600));
  }

  getQuickLinks(): Observable<QuickLinkGroup[]> {
    return of([
      {
        title: 'Applications',
        iconSvg: '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="2" width="12" height="12" rx="1.5"/><path d="M5 8h6M5 11h4"/></svg>',
        links: [
          { label: 'AuditShare', href: '/audit-queue' },
          { label: 'Intake', href: '/inbox' },
          { label: 'Adherence', href: '/adherence' },
          { label: 'Manage', href: '#' },
          { label: 'Master Balance', href: '#' },
        ]
      },
      {
        title: 'Tools',
        iconSvg: '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 2l2 4 4 .5-3 3 1 4.5L8 12l-4 2 1-4.5-3-3 4-.5z"/></svg>',
        links: [
          { label: 'Comp Bid Search', href: '#' },
          { label: 'Sleep Therapy Guide', href: '#' },
          { label: 'Sleep Doctor Mapping', href: '#' },
          { label: 'Patient Map-All Tool', href: '#' },
          { label: 'PAP Machine Pickup', href: '#' }
        ]
      },
      {
        title: 'Reports',
        iconSvg: '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 13V5M8 13V3M13 13v-6M3 13h10"/></svg>',
        links: [
          { label: 'Diabetes', href: '#' },
          { label: 'Manage', href: '#' },
          { label: 'Sales', href: '#' },
          { label: 'Workflow', href: '#' }
        ]
      },
      {
        title: 'Company & HR',
        iconSvg: '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 2h6l3 3v9H5z"/><path d="M11 2v3h3"/></svg>',
        links: [
          { label: 'Corporate Compliance', href: '#' },
          { label: 'Benefits Enrollment', href: '#' },
          { label: 'PTO Request', href: '#' }
        ]
      }
    ]).pipe(delay(500));
  }

  getActivityFeed(): Observable<ActivityItem[]> {
    return of([
      { initials: 'JB', avatarBgColor: '#EEFBFA', avatarTextColor: '#3271A0', bodyHtml: '<span class="who">Jessica B.</span> <span class="what">closed fax</span> <span class="mono" style="color: var(--primary-600);">FAX-10347</span>', timeInfo: '2 min ago · Intake' },
      { initials: 'MC', avatarBgColor: 'var(--brand-green-soft)', avatarTextColor: '#3271A0', bodyHtml: '<span class="who">Mark C.</span> <span class="what">approved refund for</span> <span>M. Alvarez</span>', timeInfo: '14 min ago · Refunds' },
      { initials: 'RT', avatarBgColor: 'var(--primary-100)', avatarTextColor: 'var(--primary-700)', bodyHtml: '<span class="who">Rita T.</span> <span class="what">assigned 12 invoices to</span> <span class="who">Trey P.</span>', timeInfo: '32 min ago · Manage' },
      { initials: 'SY', bodyHtml: '<span class="who">System</span> <span class="what">imported</span> <strong>84 referrals</strong> <span class="what">from Brightree.</span>', timeInfo: '1 hr ago · Intake' },
      { initials: 'AL', avatarBgColor: '#EEFBFA', avatarTextColor: '#3271A0', bodyHtml: '<span class="who">Angela L.</span> <span class="what">flagged</span> <span class="mono" style="color: var(--primary-600);">AUD-2041</span> <span class="what">as at-risk.</span>', timeInfo: '2 hr ago · AuditShare' }
    ]).pipe(delay(700));
  }
}
