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
  templateUrl: './app-shell.component.html'
})
export class AppShellComponent { }
