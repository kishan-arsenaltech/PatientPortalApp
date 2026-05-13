export interface AppTile {
  title: string;
  description: string;
  link: string;
  iconClass: string;
  iconSvg: string;
  metaHtml?: string; // e.g. <span class="badge badge-warning">4 due today</span>
}
