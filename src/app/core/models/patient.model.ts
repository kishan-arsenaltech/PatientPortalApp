import { BaseEntity } from './base-entity.model';

export interface Patient extends BaseEntity {
  patientID: string;
  organizationID?: string | null;
  patientNumber?: string | null;
  patientSeq?: number;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  preferredName?: string | null;
  dateOfBirth: string; // ISO string
  genderCode?: string | null;
  raceCode?: string | null;
  ethnicityCode?: string | null;
  preferredLanguage?: string | null;
  maritalStatus?: string | null;
  ssnEncrypted?: string | null;
  ssnLastFour?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  stateCode?: string | null;
  zipCode?: string | null;
  county?: string | null;
  phone?: string | null;
  phoneMobile?: string | null;
  email?: string | null;
  patientStatus: string;
  isDeceased: boolean;
  deceasedDate?: string | null;
  referralSourceCode?: string | null;
  marketCode?: string | null;
  brightreePatientID?: string | null;
  externalPatientID?: string | null;
  notes?: string | null;
}
