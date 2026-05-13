import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ModalService } from '../../../../shared/components/modal/modal.service';

@Component({
  selector: 'app-ask-portal-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div *ngIf="isOpen()" class="modal-backdrop" (click)="onBackdropClick($event)" role="dialog" aria-modal="true" aria-label="Ask Portal">
      <div class="modal" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:28px;height:28px;border-radius:8px;background:var(--brand-gradient);display:grid;place-items:center;color:white;">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2l1.8 4.2L16 8l-4.2 1.8L10 14l-1.8-4.2L4 8l4.2-1.8z"/></svg>
            </div>
            <h3 class="modal-title">Ask Portal</h3>
            <span class="badge badge-primary">Beta</span>
          </div>
          <button class="icon-btn" (click)="close()" aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 5l10 10M15 5L5 15"/></svg>
          </button>
        </div>
        
        <div class="modal-body">
          <p style="margin: 0 0 14px; color: var(--text-muted);">Ask a question about a patient, claim, or policy. Portal searches across your connected data.</p>
          <div class="field">
            <div class="input-group">
              <span class="icon">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2l1.8 4.2L16 8l-4.2 1.8L10 14l-1.8-4.2L4 8l4.2-1.8z"/>
                </svg>
              </span>
              <input class="input" [formControl]="queryControl" placeholder="e.g. How many CPAP pickups are overdue in Texas this week?" style="height: 44px;" (keydown.enter)="submitQuery()">
            </div>
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:14px;">
            <button class="badge" style="cursor:pointer;" (click)="setQuery('Recent referrals')">📋 Recent referrals</button>
            <button class="badge" style="cursor:pointer;" (click)="setQuery('Refund status')">💰 Refund status</button>
            <button class="badge" style="cursor:pointer;" (click)="setQuery('Patient on hold')">📞 Patient on hold</button>
            <button class="badge" style="cursor:pointer;" (click)="setQuery('Market variance')">📊 Market variance</button>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="btn btn-ghost" (click)="close()">Cancel</button>
          <button class="btn btn-brand" (click)="submitQuery()" [disabled]="!queryControl.value">Ask Portal</button>
        </div>
      </div>
    </div>
  `
})
export class AskPortalModalComponent implements OnInit, OnDestroy {
  queryControl = new FormControl('');
  private readonly MODAL_ID = 'ask-portal';
  private routerSub?: Subscription;

  constructor(public modalService: ModalService, private router: Router) {}

  ngOnInit(): void {
    document.addEventListener('keydown', this.handleKeyDown);
    // Auto-close modal on any navigation to prevent it from blocking page content
    this.routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => {
      if (this.isOpen()) this.close();
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.handleKeyDown);
    this.routerSub?.unsubscribe();
  }

  isOpen(): boolean {
    return this.modalService.isOpen(this.MODAL_ID);
  }

  close(): void {
    this.modalService.close();
    this.queryControl.reset();
  }

  onBackdropClick(event: MouseEvent): void {
    // The modal div has stopPropagation so only backdrop clicks reach here
    this.close();
  }

  setQuery(text: string): void {
    this.queryControl.setValue(text);
  }

  submitQuery(): void {
    if (!this.queryControl.value) return;
    console.log('Ask Portal query:', this.queryControl.value);
    this.close();
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.isOpen()) {
      this.close();
    }
  };
}
