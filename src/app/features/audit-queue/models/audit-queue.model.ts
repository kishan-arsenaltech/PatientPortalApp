export type AuditStatus = 'Documentation sent' | 'Awaiting payer' | 'Appeal submitted' | 'Overturned' | 'Upheld' | 'Closed';
export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface AuditRecord {
  id: string;
  patientName: string;
  patientId: string;
  initials: string;
  invoiceNum: string;
  payer: string;
  market: string;
  assignedTo: string;
  type: string;
  amount: number;
  deadline: string;
  status: AuditStatus;
  risk: RiskLevel;
  isOverdue?: boolean;
}

export interface QueueStat {
  label: string;
  value: string | number;
  trend?: string;
  colorClass?: string;
}

export interface SavedView {
  label: string;
  count?: number;
  active?: boolean;
}
