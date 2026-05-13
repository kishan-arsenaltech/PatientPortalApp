export type BadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'magenta' | '';

export interface InboxItem {
  id: string;
  unread: boolean;
  title: string;
  who: string;
  snippet: string;
  time: string;
  tag: BadgeType;
  tagLabel: string;
  isActionRequired?: boolean;
}
