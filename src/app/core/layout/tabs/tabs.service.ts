import { Injectable, signal, effect } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Tab } from '../../models/tab.model';

const REGISTRY: Record<string, Tab> = {
  dashboard:     { id: 'dashboard',   title: 'Dashboard',   icon: 'home',   href: '/dashboard',   closable: false },
  inbox:         { id: 'inbox',       title: 'My Inbox',    icon: 'inbox',  href: '/inbox',       closable: true },
  adherence:     { id: 'adherence',   title: 'Adherence',   icon: 'search', href: '/adherence',   closable: true },
  'audit-queue': { id: 'audit-queue', title: 'Audit Queue', icon: 'check',  href: '/audit-queue', closable: true },
  'referrals':   { id: 'referrals',   title: 'New Referral', icon: 'file',   href: '/referrals/new', closable: true },
};

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  private readonly STORAGE_KEY = 'ah.tabs.ids';
  private readonly ACTIVE_KEY = 'ah.tabs.active';
  
  tabs = signal<Tab[]>([]);
  activeTabId = signal<string>('dashboard');

  constructor(private router: Router) {
    this.initTabs();
    
    // Automatically set active tab based on route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      
      // Exact match or prefix match for routes
      const matchedKey = Object.keys(REGISTRY).find(k => {
        const href = REGISTRY[k].href;
        return url === href || url.startsWith(href + '/') || url.startsWith(href + '?');
      });

      if (matchedKey) {
        this.openTab(matchedKey, false);
      }
    });

    // Save state on change
    effect(() => {
      const currentTabs = this.tabs().map(t => t.id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(currentTabs));
    });

    effect(() => {
      localStorage.setItem(this.ACTIVE_KEY, this.activeTabId());
    });
  }

  private initTabs(): void {
    let savedTabIds: string[] = [];
    let savedActiveId = 'dashboard';

    try {
      savedTabIds = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '["dashboard"]');
      savedActiveId = localStorage.getItem(this.ACTIVE_KEY) || 'dashboard';
    } catch {
      savedTabIds = ['dashboard'];
    }
    
    if (!savedTabIds.includes('dashboard')) {
      savedTabIds.unshift('dashboard');
    }

    const loadedTabs = savedTabIds
      .map(id => REGISTRY[id])
      .filter(t => !!t);

    this.tabs.set(loadedTabs);
    
    // Ensure active tab is one of the loaded tabs
    if (loadedTabs.find(t => t.id === savedActiveId)) {
      this.activeTabId.set(savedActiveId);
    } else {
      this.activeTabId.set('dashboard');
    }
  }

  openTab(id: string, navigate = true): void {
    const tabMeta = REGISTRY[id];
    if (!tabMeta) return;

    const currentTabs = this.tabs();
    if (!currentTabs.find(t => t.id === id)) {
      this.tabs.set([...currentTabs, tabMeta]);
    }
    
    this.activeTabId.set(id);
    
    if (navigate) {
      this.router.navigate([tabMeta.href]);
    }
  }

  closeTab(id: string): void {
    if (id === 'dashboard') return; // Cannot close dashboard

    let currentTabs = this.tabs();
    const idx = currentTabs.findIndex(t => t.id === id);
    if (idx === -1) return;

    const newTabs = currentTabs.filter(t => t.id !== id);
    this.tabs.set(newTabs);

    // If closing the currently active tab, navigate to the adjacent one
    if (this.activeTabId() === id) {
      const fallback = newTabs[Math.max(0, idx - 1)] || REGISTRY['dashboard'];
      this.activeTabId.set(fallback.id);
      this.router.navigate([fallback.href]);
    }
  }

  getIconSvg(name: string): string {
    const icons: any = {
      home:   '<path d="M3 10.5L10 4l7 6.5V17a1 1 0 01-1 1h-3v-5H7v5H4a1 1 0 01-1-1v-6.5z"/>',
      inbox:  '<path d="M3 13l3-8h8l3 8M3 13v3a1 1 0 001 1h12a1 1 0 001-1v-3M3 13h4l1 2h4l1-2h4"/>',
      search: '<circle cx="9" cy="9" r="5"/><path d="M13 13l3 3"/>',
      file:   '<path d="M5 3h6l4 4v10a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M11 3v4h4"/>',
      check:  '<path d="M4 10l4 4 8-8"/>',
      grid:   '<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="11" y="3" width="6" height="6" rx="1"/><rect x="3" y="11" width="6" height="6" rx="1"/><rect x="11" y="11" width="6" height="6" rx="1"/>',
      close:  '<path d="M5 5l8 8M13 5l-8 8"/>',
    };
    return `<svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${icons[name] || ''}</svg>`;
  }
}
