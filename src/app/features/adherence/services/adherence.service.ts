import { Injectable, signal, inject } from '@angular/core';
import { Patient as UIPatient, SavedSearch, MarketStat } from '../models/adherence.model';
import { PatientService } from '../../../core/services/patient.service';

@Injectable({
  providedIn: 'root'
})
export class AdherenceService {
  private patientService = inject(PatientService);

  private patients = signal<UIPatient[]>([]);
  private savedLists = signal<SavedSearch[]>([]);
  private stats = signal<MarketStat[]>([]);

  constructor() {
    this.loadPatients();
  }

  private loadPatients() {
    this.patientService.getAll().subscribe({
      next: (backendPatients) => {
        const uiPatients: UIPatient[] = backendPatients.map(bp => ({
          name: `${bp.firstName} ${bp.lastName}`,
          id: bp.patientNumber || bp.patientID.substring(0, 8),
          initials: `${bp.firstName.charAt(0)}${bp.lastName.charAt(0)}`.toUpperCase(),
          market: bp.marketCode || 'Unknown',
          order: 'N/A',
          orderAge: 'N/A',
          comp: 0,
          status: { label: bp.patientStatus || 'Active', cls: 'badge-success' }
        }));
        this.patients.set(uiPatients);
      },
      error: (err) => console.error('Failed to load patients', err)
    });
  }

  getPatients() {
    return this.patients.asReadonly();
  }

  getSavedLists() {
    return this.savedLists.asReadonly();
  }

  getStats() {
    return this.stats.asReadonly();
  }
}
