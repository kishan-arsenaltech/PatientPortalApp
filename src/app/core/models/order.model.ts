import { BaseEntity } from './base-entity.model';

export interface Order extends BaseEntity {
  orderID: string;
  patientID: string;
  providerID?: string | null;
  organizationID?: string | null;
  orderNumber?: string | null;
  orderType: string;
  hcpcsCode?: string | null;
  icdCodes?: string | null;
  orderDate: string; // ISO string
  setupDate?: string | null;
  dischargeDate?: string | null;
  orderStatus: string;
  quantity: number;
  resupplyFreq?: string | null;
  notes?: string | null;
  externalOrderID?: string | null;
}
