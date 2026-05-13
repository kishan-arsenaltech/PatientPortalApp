import { Injectable, signal } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ReferralFormData, DraftStatus } from '../models/referral-form.model';
import { ApiService } from '../../../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class ReferralFormService {
  private _draftStatus = signal<DraftStatus>('idle');
  private _lastSavedAt = signal<Date | null>(null);

  readonly draftStatus = this._draftStatus.asReadonly();
  readonly lastSavedAt = this._lastSavedAt.asReadonly();

  constructor(private apiService: ApiService) {}

  submitReferral(data: ReferralFormData): Observable<{ referralID: string }> {
    return this.apiService.post<{ referralID: string }>('/Referrals', this.mapToApi(data));
  }

  saveDraft(data: ReferralFormData): Observable<void> {
    this._draftStatus.set('saving');
    return of(void 0).pipe(
      switchMap(() => timer(600)),
      tap(() => {
        this._draftStatus.set('saved');
        this._lastSavedAt.set(new Date());
      }),
      switchMap(() => of(void 0))
    );
  }

  getLastSavedLabel(): string {
    const d = this._lastSavedAt();
    if (!d) return '';
    const diffSec = Math.floor((Date.now() - d.getTime()) / 1000);
    if (diffSec < 60) return `Draft auto-saved ${diffSec}s ago`;
    const diffMin = Math.floor(diffSec / 60);
    return `Draft auto-saved ${diffMin}m ago`;
  }

  private mapToApi(data: ReferralFormData): object {
    return {
      sourceType: 'FORM',
      referralStatus: 'NEW',
      priority: (data.order.priority || 'standard').toUpperCase(),
      intakeFirstName: data.patient.firstName,
      intakeLastName: data.patient.lastName,
      intakeDOB: data.patient.dateOfBirth,
      intakePhone: data.patient.phone,
      orderType: data.order.orderType,
      diagnosisCodes: data.order.hcpcsCodes,
      prescriberNpi: data.order.physicianNpi,
      clinicalNotes: data.order.clinicalNotes,
      receivedAt: new Date().toISOString(),
    };
  }
}
