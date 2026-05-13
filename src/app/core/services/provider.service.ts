import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Provider } from '../models/provider.model';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<Provider[]> {
    return this.apiService.get<Provider[]>('/Providers');
  }

  getById(id: string): Observable<Provider> {
    return this.apiService.get<Provider>(`/Providers/${id}`);
  }

  getByNpi(npi: string): Observable<Provider> {
    return this.apiService.get<Provider>(`/Providers/npi/${npi}`);
  }

  create(provider: Provider): Observable<Provider> {
    return this.apiService.post<Provider>('/Providers', provider);
  }

  update(id: string, provider: Provider): Observable<void> {
    return this.apiService.put<void>(`/Providers/${id}`, provider);
  }

  delete(id: string): Observable<void> {
    return this.apiService.delete<void>(`/Providers/${id}`);
  }
}
