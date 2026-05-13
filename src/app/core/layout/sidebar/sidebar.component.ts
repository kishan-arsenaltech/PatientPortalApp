import { Component, HostBinding, HostListener, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, SafeHtmlPipe],
  template: `
    <!-- Sidebar -->
    <aside class="app-sidebar" 
           [attr.data-expanded]="layoutService.isSidebarExpanded()"
           [attr.data-mobile-open]="layoutService.isMobileSidebarOpen()"
           (mouseenter)="onMouseEnter()"
           (mouseleave)="onMouseLeave()">
      <div class="sidebar-brand">
        <a routerLink="/dashboard" class="pp-logo">
          <img class="logo-icon" src="../assets/images/logo-collapse.png" alt="PatientPortal" style="height: 28px; width: auto; display: block; flex-shrink: 0;">
          <img class="logo-full word" src="../assets/images/logo.png" alt="PatientPortal" style="height: 22px; width: auto; display: block;">
        </a>
      </div>
      
      <nav class="sidebar-nav">
        <a *ngFor="let item of navItems" 
           class="sidebar-item" 
           [routerLink]="item.href" 
           routerLinkActive="active" 
           (click)="closeMobile()">
          <span class="icon">
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" [innerHTML]="item.iconSvg | safeHtml">
            </svg>
          </span>
          <span class="label">{{ item.label }}</span>
        </a>
      </nav>
      
      <div class="sidebar-footer">
        <a class="sidebar-item" href="#" (click)="closeMobile()">
          <span class="icon">
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="10" cy="10" r="7"/><path d="M8 8a2 2 0 114 0c0 1.2-2 1.4-2 3M10 14.5v.5"/>
            </svg>
          </span>
          <span class="label">Help &amp; support</span>
        </a>
        <a class="sidebar-item" href="#" (click)="closeMobile()">
          <span class="icon">
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="10" cy="10" r="2.5"/><path d="M16 10l1-2-1-2-2 .5L13 5l-2 1-2-1-1 1.5L6 6 5 8l1 2-1 2 1 2 2-.5 1 1.5 2-1 2 1 1-1.5 2-.5-1-2z"/>
            </svg>
          </span>
          <span class="label">Settings</span>
        </a>
      </div>
    </aside>

    <!-- Mobile Scrim -->
    <div class="sidebar-scrim" *ngIf="layoutService.isMobileSidebarOpen()" (click)="closeMobile()"></div>
  `,
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  private isHovered = false;

  navItems = [
    { id: 'login', label: 'Login', href: '/login', iconSvg: '<path d="M8 3H5a1 1 0 00-1 1v12a1 1 0 001 1h3M13 14l3-4-3-4M16 10H8"/>' },
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', iconSvg: '<path d="M3 10.5L10 4l7 6.5V17a1 1 0 01-1 1h-3v-5H7v5H4a1 1 0 01-1-1v-6.5z"/>' },
    { id: 'inbox', label: 'Inbox', href: '/inbox', iconSvg: '<path d="M3 13l3-8h8l3 8M3 13v3a1 1 0 001 1h12a1 1 0 001-1v-3M3 13h4l1 2h4l1-2h4"/>' },
    { id: 'adherence', label: 'Adherence', href: '/adherence', iconSvg: '<circle cx="9" cy="9" r="5"/><path d="M13 13l4 4"/>' },
    { id: 'audit-queue', label: 'Audit Queue', href: '/audit-queue', iconSvg: '<path d="M4 4h10l2 4-2 4H4zM4 4v12"/>' },
    { id: 'showcase', label: 'UI Showcase', href: '/ui-showcase', iconSvg: '<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="11" y="3" width="6" height="6" rx="1"/><rect x="3" y="11" width="6" height="6" rx="1"/><rect x="11" y="11" width="6" height="6" rx="1"/>' },
  ];

  constructor(public layoutService: LayoutService) {
    effect(() => {
      if (this.layoutService.isMobileSidebarOpen()) {
        document.body.classList.add('sidebar-open');
      } else {
        document.body.classList.remove('sidebar-open');
      }
    });
  }

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }

  closeMobile() {
    this.layoutService.setMobileSidebarOpen(false);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth > 768 && this.layoutService.isMobileSidebarOpen()) {
      this.layoutService.setMobileSidebarOpen(false);
    }
  }
}

