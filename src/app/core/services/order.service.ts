import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<Order[]> {
    return this.apiService.get<Order[]>('/Orders');
  }

  getById(id: string): Observable<Order> {
    return this.apiService.get<Order>(`/Orders/${id}`);
  }

  getByPatient(patientId: string): Observable<Order[]> {
    return this.apiService.get<Order[]>(`/Orders/patient/${patientId}`);
  }

  create(order: Order): Observable<Order> {
    return this.apiService.post<Order>('/Orders', order);
  }

  update(id: string, order: Order): Observable<void> {
    return this.apiService.put<void>(`/Orders/${id}`, order);
  }

  delete(id: string): Observable<void> {
    return this.apiService.delete<void>(`/Orders/${id}`);
  }
}
