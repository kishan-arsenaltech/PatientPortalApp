import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  // Sidebar expanded state (desktop)
  isSidebarExpanded = signal<boolean>(false);
  // Sidebar mobile open state (mobile drawer)
  isMobileSidebarOpen = signal<boolean>(false);

  toggleSidebar(): void {
    this.isSidebarExpanded.update(val => !val);
  }

  setSidebarExpanded(expanded: boolean): void {
    this.isSidebarExpanded.set(expanded);
  }

  toggleMobileSidebar(): void {
    this.isMobileSidebarOpen.update(val => !val);
  }

  setMobileSidebarOpen(open: boolean): void {
    this.isMobileSidebarOpen.set(open);
  }
}
