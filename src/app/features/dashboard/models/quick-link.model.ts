export interface QuickLinkGroup {
  title: string;
  iconSvg: string;
  links: QuickLink[];
}

export interface QuickLink {
  label: string;
  href: string;
}
