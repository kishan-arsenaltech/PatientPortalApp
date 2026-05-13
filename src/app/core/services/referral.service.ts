import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Referral } from '../models/referral.model';

@Injectable({
  providedIn: 'root'
})
export class ReferralService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<Referral[]> {
    return this.apiService.get<Referral[]>('/Referrals');
  }

  getPending(): Observable<Referral[]> {
    return this.apiService.get<Referral[]>('/Referrals/pending');
  }

  getById(id: string): Observable<Referral> {
    return this.apiService.get<Referral>(`/Referrals/${id}`);
  }

  create(referral: Referral): Observable<Referral> {
    return this.apiService.post<Referral>('/Referrals', referral);
  }

  update(id: string, referral: Referral): Observable<void> {
    return this.apiService.put<void>(`/Referrals/${id}`, referral);
  }

  delete(id: string): Observable<void> {
    return this.apiService.delete<void>(`/Referrals/${id}`);
  }
}
