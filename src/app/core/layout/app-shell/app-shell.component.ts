import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { TabsComponent } from '../tabs/tabs.component';
import { ToastComponent } from '../../../shared/components/toast/toast.component';
import { NotificationPanelComponent } from '../../../shared/components/notification-panel/notification-panel.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    SidebarComponent, 
    HeaderComponent, 
    TabsComponent,
    ToastComponent,
    NotificationPanelComponent
  ],
  template: `
    <div class="app-shell">
      <app-sidebar></app-sidebar>
      <app-header></app-header>
      <app-tabs></app-tabs>
      <main class="app-main">
        <div class="app-main-content">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
    <app-toast></app-toast>
    <app-notification-panel></app-notification-panel>
  `
})
export class AppShellComponent {}
