import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsService } from './tabs.service';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="app-tabs">
      <div 
        *ngFor="let tab of tabsService.tabs()" 
        class="tab" 
        [class.active]="tab.id === tabsService.activeTabId()"
        (click)="tabsService.openTab(tab.id)"
      >
        <span class="tab-bg"></span>
        <span class="tab-inner">
          <span class="tab-icon" [innerHTML]="tabsService.getIconSvg(tab.icon) | safeHtml"></span>
          <span class="tab-title">{{ tab.title }}</span>
          <span *ngIf="tab.closable" class="tab-close" role="button" aria-label="Close tab" (click)="closeTab($event, tab.id)">
            <span [innerHTML]="tabsService.getIconSvg('close') | safeHtml"></span>
          </span>
        </span>
      </div>
    </div>
  `,
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
