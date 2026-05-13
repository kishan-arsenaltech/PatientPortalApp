import { BaseEntity } from './base-entity.model';

export interface Referral extends BaseEntity {
  referralID: string;
  organizationID?: string | null;
  referralNumber?: string | null;
  sourceType: string;
  referralStatus: string;
  priority: string;
  patientID?: string | null;
  providerID?: string | null;
  intakeFirstName?: string | null;
  intakeLastName?: string | null;
  intakeDOB?: string | null;
  intakePhone?: string | null;
  intakeInsuranceID?: string | null;
  intakeInsuranceName?: string | null;
  orderType?: string | null;
  diagnosisCodes?: string | null;
  prescriberName?: string | null;
  prescriberNpi?: string | null;
  clinicalNotes?: string | null;
  faxNumber?: string | null;
  receivedAt: string; // ISO string
  assignedToUserID?: string | null;
  dueDate?: string | null;
  closedAt?: string | null;
  closedByUserID?: string | null;
  closureReason?: string | null;
}
