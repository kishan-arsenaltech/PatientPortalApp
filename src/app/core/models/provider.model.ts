import { BaseEntity } from './base-entity.model';

export interface Provider extends BaseEntity {
  providerID: string;
  organizationID?: string | null;
  userID?: string | null;
  npi?: string | null;
  firstName: string;
  lastName: string;
  credentials?: string | null;
  specialty?: string | null;
  email?: string | null;
  phone?: string | null;
}
