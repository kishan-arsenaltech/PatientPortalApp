import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsService } from './tabs.service';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
  constructor(public tabsService: TabsService) { }

  closeTab(event: Event, id: string): void {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    this.tabsService.closeTab(id);
  }
}
