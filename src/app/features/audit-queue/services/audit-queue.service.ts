import { Injectable, signal, inject } from '@angular/core';
import { AuditRecord, QueueStat, SavedView } from '../models/audit-queue.model';
import { OrderService } from '../../../core/services/order.service';

@Injectable({
  providedIn: 'root'
})
export class AuditQueueService {
  private orderService = inject(OrderService);

  private audits = signal<AuditRecord[]>([]);
  private stats = signal<QueueStat[]>([]);
  private summaryCards = signal<QueueStat[]>([]);

  constructor() {
    this.loadOrdersAsAudits();
  }

  private loadOrdersAsAudits() {
    this.orderService.getAll().subscribe({
      next: (backendOrders) => {
        // Map backend orders to AuditRecords for the UI
        const uiAudits: AuditRecord[] = backendOrders.map(o => ({
          id: o.orderNumber || o.orderID.substring(0, 8),
          patientName: 'Unknown Patient', // In a real app we'd join with Patient data
          patientId: o.patientID,
          initials: 'UP',
          invoiceNum: o.externalOrderID || 'N/A',
          payer: 'Unknown',
          market: 'Unknown',
          assignedTo: 'Unassigned',
          type: o.orderType,
          amount: o.quantity * 100, // Dummy amount
          deadline: new Date().toISOString().split('T')[0],
          status: o.orderStatus as any, // Cast as any or AuditStatus to satisfy TS
          risk: 'Medium'
        }));
        this.audits.set(uiAudits);
      },
      error: (err) => console.error('Failed to load orders for audit queue', err)
    });
  }

  getAudits() {
    return this.audits.asReadonly();
  }

  getStats() {
    return this.stats.asReadonly();
  }

  getSummaryCards() {
    return this.summaryCards.asReadonly();
  }
}
