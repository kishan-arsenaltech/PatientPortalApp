import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AuditQueueService } from './services/audit-queue.service';
import { AuditRecord, RiskLevel } from './models/audit-queue.model';

@Component({
  selector: 'app-audit-queue',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './audit-queue.component.html',
  styleUrls: ['./audit-queue.component.css']
})
export class AuditQueueComponent {
  private auditService = inject(AuditQueueService);
  private fb = inject(FormBuilder);

  protected readonly Math = Math;

  filterForm: FormGroup = this.fb.group({
    status: ['All status'],
    payer: ['All payers'],
    market: ['All markets'],
    reviewer: ['All reviewers'],
    type: ['All types'],
    onlyOverdue: [false],
    search: ['']
  });

  audits = this.auditService.getAudits();
  stats = this.auditService.getStats();
  summaryCards = this.auditService.getSummaryCards();

  savedViews = [
    { label: 'My active audits', count: 14, active: true },
    { label: 'Appeals pending', count: 8 },
    { label: 'Medicare RAC', count: 22 },
    { label: 'High dollar claims', count: 5 },
    { label: 'Closing this week', count: 12 },
  ];

  // Table state
  sortColumn = signal<keyof AuditRecord | ''>('deadline');
  sortDirection = signal<'asc' | 'desc'>('asc');
  currentPage = signal(1);
  pageSize = signal(10);

  filteredAudits = computed(() => {
    let list = [...this.audits()];
    const filters = this.filterForm.value;

    if (filters.status !== 'All status') {
      list = list.filter(a => a.status === filters.status);
    }
    if (filters.payer !== 'All payers') {
      list = list.filter(a => a.payer === filters.payer);
    }
    if (filters.onlyOverdue) {
      list = list.filter(a => a.isOverdue);
    }
    if (filters.search) {
      const s = filters.search.toLowerCase();
      list = list.filter(a => 
        a.id.toLowerCase().includes(s) || 
        a.patientName.toLowerCase().includes(s) ||
        a.invoiceNum.toLowerCase().includes(s)
      );
    }

    const col = this.sortColumn();
    if (col) {
      list.sort((a, b) => {
        const valA = a[col] ?? '';
        const valB = b[col] ?? '';
        const dir = this.sortDirection() === 'asc' ? 1 : -1;
        if (valA < valB) return -1 * dir;
        if (valA > valB) return 1 * dir;
        return 0;
      });
    }

    return list;
  });

  paginatedAudits = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredAudits().slice(start, start + this.pageSize());
  });

  totalPages = computed(() => Math.ceil(this.filteredAudits().length / this.pageSize()));

  sort(column: keyof AuditRecord) {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  getRiskClass(risk: RiskLevel): string {
    switch (risk) {
      case 'High': return 'badge-danger';
      case 'Medium': return 'badge-warning';
      case 'Low': return 'badge-success';
      default: return '';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Overturned': return 'badge-success';
      case 'Upheld': return 'badge-danger';
      case 'Closed': return 'badge-secondary';
      case 'Appeal submitted': return 'badge-primary';
      default: return 'badge-warning';
    }
  }
}
