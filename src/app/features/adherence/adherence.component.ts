import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdherenceService } from './services/adherence.service';
import { Patient } from './models/adherence.model';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-adherence',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, SafeHtmlPipe],
  templateUrl: './adherence.component.html',
  styleUrls: ['./adherence.component.css']
})
export class AdherenceComponent {
  private adherenceService = inject(AdherenceService);
  private fb = inject(FormBuilder);

  protected readonly Math = Math;

  searchForm: FormGroup = this.fb.group({
    firstName: [''],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    dob: [''],
    phone: [''],
    patientId: [''],
    salesOrder: [''],
    nickname: ['Any nickname'],
    includeArchived: [true]
  });

  patients = this.adherenceService.getPatients();
  savedLists = this.adherenceService.getSavedLists();
  stats = this.adherenceService.getStats();

  // Pagination & Filtering state
  searchTerm = signal('');
  sortColumn = signal<keyof Patient | ''>('name');
  sortDirection = signal<'asc' | 'desc'>('asc');
  currentPage = signal(1);
  pageSize = signal(10);

  filteredPatients = computed(() => {
    let list = [...this.patients()];
    const search = this.searchTerm().toLowerCase();

    if (search) {
      list = list.filter(p => 
        p.name.toLowerCase().includes(search) || 
        p.id.toLowerCase().includes(search) ||
        p.market.toLowerCase().includes(search)
      );
    }

    const col = this.sortColumn();
    if (col) {
      list.sort((a, b) => {
        const valA = a[col];
        const valB = b[col];
        const dir = this.sortDirection() === 'asc' ? 1 : -1;
        if (valA < valB) return -1 * dir;
        if (valA > valB) return 1 * dir;
        return 0;
      });
    }

    return list;
  });

  paginatedPatients = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredPatients().slice(start, start + this.pageSize());
  });

  totalPages = computed(() => Math.ceil(this.filteredPatients().length / this.pageSize()));

  search() {
    console.log('Searching with:', this.searchForm.value);
    this.searchTerm.set(this.searchForm.value.lastName || '');
    this.currentPage.set(1);
  }

  clear() {
    this.searchForm.reset({
      nickname: 'Any nickname',
      includeArchived: true
    });
    this.searchTerm.set('');
    this.currentPage.set(1);
  }

  sort(column: keyof Patient) {
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

  getComplianceColor(comp: number): string {
    if (comp >= 85) return 'var(--success)';
    if (comp >= 65) return 'var(--warning)';
    return 'var(--danger)';
  }
}
