export interface PatientStatus {
  label: string;
  cls: string;
}

export interface Patient {
  id: string;
  name: string;
  initials: string;
  market: string;
  order: string;
  orderAge: string;
  comp: number;
  status: PatientStatus;
}

export interface SavedSearch {
  label: string;
  count?: number;
  active?: boolean;
  color: string;
}

export interface MarketStat {
  value: string;
  label: string;
  icon: string;
  colorClass: string;
  bgColor: string;
}
