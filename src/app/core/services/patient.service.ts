import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<Patient[]> {
    return this.apiService.get<Patient[]>('/Patients');
  }

  getById(id: string): Observable<Patient> {
    return this.apiService.get<Patient>(`/Patients/${id}`);
  }

  search(term: string): Observable<Patient[]> {
    let params = new HttpParams().set('term', term);
    return this.apiService.get<Patient[]>('/Patients/search', params);
  }

  create(patient: Patient): Observable<Patient> {
    return this.apiService.post<Patient>('/Patients', patient);
  }

  update(id: string, patient: Patient): Observable<void> {
    return this.apiService.put<void>(`/Patients/${id}`, patient);
  }

  delete(id: string): Observable<void> {
    return this.apiService.delete<void>(`/Patients/${id}`);
  }
}
