import { Injectable, signal } from '@angular/core';
import { AuditRecord, QueueStat, SavedView } from '../models/audit-queue.model';

@Injectable({
  providedIn: 'root'
})
export class AuditQueueService {
  private audits = signal<AuditRecord[]>([
    { id: 'AUD-2041', patientName: 'Roberto Martinez', patientId: 'P-284117', initials: 'RM', invoiceNum: '87-002194', payer: 'BCBS PPO', market: 'Austin, TX', assignedTo: 'Nathan A.', type: 'Pre-payment', amount: 486.20, deadline: '2026-02-05', status: 'Documentation sent', risk: 'Medium' },
    { id: 'AUD-2038', patientName: 'Janice Alvarez', patientId: 'P-284032', initials: 'JA', invoiceNum: '87-001922', payer: 'Medicare', market: 'Dallas, TX', assignedTo: 'Sarah C.', type: 'RAC', amount: 1240.00, deadline: '2026-01-20', status: 'Awaiting payer', risk: 'High', isOverdue: true },
    { id: 'AUD-2045', patientName: 'Kenneth Brooks', patientId: 'P-283912', initials: 'KB', invoiceNum: '87-003310', payer: 'Aetna', market: 'Phoenix, AZ', assignedTo: 'Nathan A.', type: 'Post-payment', amount: 89.50, deadline: '2026-02-12', status: 'Documentation sent', risk: 'Low' },
    { id: 'AUD-2022', patientName: 'Mary Chen', patientId: 'P-284221', initials: 'MC', invoiceNum: '87-004128', payer: 'UnitedHealth', market: 'Denver, CO', assignedTo: 'Mike R.', type: 'SMRC', amount: 3420.00, deadline: '2026-01-15', status: 'Appeal submitted', risk: 'High', isOverdue: true },
    { id: 'AUD-2050', patientName: 'Darius Powell', patientId: 'P-283744', initials: 'DP', invoiceNum: '87-000844', payer: 'Humana', market: 'Atlanta, GA', assignedTo: 'Sarah C.', type: 'Pre-payment', amount: 156.00, deadline: '2026-02-28', status: 'Documentation sent', risk: 'Medium' },
    { id: 'AUD-2015', patientName: 'Susan O\'Neill', patientId: 'P-284098', initials: 'SO', invoiceNum: '87-002241', payer: 'BCBS PPO', market: 'Austin, TX', assignedTo: 'Nathan A.', type: 'Post-payment', amount: 512.20, deadline: '2026-01-10', status: 'Overturned', risk: 'Low' },
    { id: 'AUD-2055', patientName: 'Michael Tan', patientId: 'P-284204', initials: 'MT', invoiceNum: '87-004456', payer: 'Cigna', market: 'Seattle, WA', assignedTo: 'Mike R.', type: 'Pre-payment', amount: 2200.00, deadline: '2026-03-05', status: 'Documentation sent', risk: 'High' },
    { id: 'AUD-2030', patientName: 'Elena Vasquez', patientId: 'P-283601', initials: 'EV', invoiceNum: '87-000102', payer: 'Medicare', market: 'Miami, FL', assignedTo: 'Sarah C.', type: 'RAC', amount: 840.00, deadline: '2026-01-25', status: 'Upheld', risk: 'Medium' },
    { id: 'AUD-2048', patientName: 'James O\'Connor', patientId: 'P-284011', initials: 'JO', invoiceNum: '87-003881', payer: 'Aetna', market: 'Chicago, IL', assignedTo: 'Nathan A.', type: 'Post-payment', amount: 310.50, deadline: '2026-02-20', status: 'Awaiting payer', risk: 'Low' },
    { id: 'AUD-2060', patientName: 'Priya Patel', patientId: 'P-284255', initials: 'PP', invoiceNum: '87-004501', payer: 'BCBS PPO', market: 'Austin, TX', assignedTo: 'Mike R.', type: 'Pre-payment', amount: 128.50, deadline: '2026-03-12', status: 'Documentation sent', risk: 'Medium' },
    { id: 'AUD-2010', patientName: 'Harold Jenkins', patientId: 'P-283488', initials: 'HJ', invoiceNum: '87-000045', payer: 'Medicare', market: 'Dallas, TX', assignedTo: 'Sarah C.', type: 'RAC', amount: 4500.00, deadline: '2025-12-15', status: 'Closed', risk: 'High' },
    { id: 'AUD-2065', patientName: 'Angela Liu', patientId: 'P-284167', initials: 'AL', invoiceNum: '87-004221', payer: 'UnitedHealth', market: 'Denver, CO', assignedTo: 'Nathan A.', type: 'SMRC', amount: 980.00, deadline: '2026-03-20', status: 'Documentation sent', risk: 'Low' },
    { id: 'AUD-2042', patientName: 'Marcus Webb', patientId: 'P-283823', initials: 'MW', invoiceNum: '87-002884', payer: 'Cigna', market: 'Phoenix, AZ', assignedTo: 'Mike R.', type: 'Post-payment', amount: 110.00, deadline: '2026-02-08', status: 'Awaiting payer', risk: 'Medium' },
    { id: 'AUD-2070', patientName: 'Diana Ross', patientId: 'P-284287', initials: 'DR', invoiceNum: '87-004991', payer: 'Humana', market: 'Atlanta, GA', assignedTo: 'Sarah C.', type: 'Pre-payment', amount: 245.20, deadline: '2026-03-25', status: 'Documentation sent', risk: 'Medium' },
    { id: 'AUD-2035', patientName: 'Samuel Lee', patientId: 'P-283977', initials: 'SL', invoiceNum: '87-001552', payer: 'Medicare', market: 'Seattle, WA', assignedTo: 'Nathan A.', type: 'RAC', amount: 1800.00, deadline: '2026-01-30', status: 'Awaiting payer', risk: 'High' },
  ]);

  private stats = signal<QueueStat[]>([
    { label: 'Open audits', value: 42, colorClass: 'var(--primary-700)' },
    { label: 'Due this week', value: 12, colorClass: 'var(--warning)' },
    { label: 'Overturned rate', value: '78%', trend: '+4.2%' },
    { label: 'Avg resolution', value: '14 days', trend: '-2d' },
  ]);

  private summaryCards = signal<QueueStat[]>([
    { label: 'Total audits', value: 154 },
    { label: 'Pending response', value: 82 },
    { label: 'Doc requested', value: 34 },
    { label: 'Appeals in progress', value: 18 },
    { label: 'Overturned', value: 112 },
    { label: 'Denied', value: 42 },
  ]);

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
