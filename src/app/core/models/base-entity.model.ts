export interface BaseEntity {
  tenantID?: string;
  isActive?: boolean;
  createdAt?: string;
  createdByUserID?: string | null;
  updatedAt?: string;
  updatedByUserID?: string | null;
  rowVersion?: string | null;
  deletedAt?: string | null;
}
