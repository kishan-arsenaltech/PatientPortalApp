import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../services/layout.service';
import { ThemeService } from '../../services/theme.service';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { NotificationService } from '../../../shared/components/notification-panel/notification.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(
    public layoutService: LayoutService,
    public themeService: ThemeService,
    public modalService: ModalService,
    public notificationService: NotificationService
  ) { }
}
