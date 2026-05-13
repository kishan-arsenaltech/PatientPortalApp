import { Component, HostListener, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { AuthService } from '../../services/auth.service';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, SafeHtmlPipe],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  private isHovered = false;
  private authService = inject(AuthService);

  navItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', iconSvg: '<path d="M3 10.5L10 4l7 6.5V17a1 1 0 01-1 1h-3v-5H7v5H4a1 1 0 01-1-1v-6.5z"/>' },
    { id: 'inbox', label: 'Inbox', href: '/inbox', iconSvg: '<path d="M3 13l3-8h8l3 8M3 13v3a1 1 0 001 1h12a1 1 0 001-1v-3M3 13h4l1 2h4l1-2h4"/>' },
    { id: 'adherence', label: 'Adherence', href: '/adherence', iconSvg: '<circle cx="9" cy="9" r="5"/><path d="M13 13l4 4"/>' },
    { id: 'audit-queue', label: 'Audit Queue', href: '/audit-queue', iconSvg: '<path d="M4 4h10l2 4-2 4H4zM4 4v12"/>' },
    { id: 'referrals', label: 'Referrals', href: '/referrals/new', iconSvg: '<path d="M4 4h12v12H4zM8 4v12M4 8h12"/>' },
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

  logout(): void {
    this.closeMobile();
    this.authService.logout();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth > 768 && this.layoutService.isMobileSidebarOpen()) {
      this.layoutService.setMobileSidebarOpen(false);
    }
  }
}

