export type SexOption = 'male' | 'female' | 'non-binary' | 'decline';
export type OrderType = 'cpap-bipap' | 'oxygen' | 'diabetic-supplies' | 'mobility' | 'wound-care' | 'other';
export type Priority = 'standard' | 'expedited' | 'stat';
export type ContactPreference = 'phone' | 'sms' | 'email' | 'portal';
export type DraftStatus = 'idle' | 'saving' | 'saved' | 'error';

export interface ChipOption {
  label: string;
  value: string;
}

export interface SectionProgress {
  id: string;
  anchor: string;
  label: string;
  completedFields: number;
  totalFields: number;
  isActive: boolean;
}

export interface PatientInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  sex: SexOption | null;
  phone: string;
  email: string;
  preferredContact: ContactPreference;
  streetAddress: string;
}

export interface OrderInfo {
  orderType: OrderType | null;
  hcpcsCodes: string;
  physicianNpi: string;
  clinicalNotes: string;
  fulfillmentDate: string;
  priority: Priority;
}

export interface InsuranceInfo {
  primaryPayer: string;
  memberId: string;
  secondaryPayer: string;
  assignedBranch: string;
  runEligibilityCheck: boolean;
  hasPriorAuth: boolean;
}

export interface ReferralFormData {
  patient: PatientInfo;
  order: OrderInfo;
  insurance: InsuranceInfo;
}
